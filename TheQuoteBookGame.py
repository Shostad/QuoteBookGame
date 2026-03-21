##quotes game
import random, time
class Quote():
    def __init__(self,quote,date,rawQuote,bookName):
        self.quote = quote
        self.authors = []
        self.date = date
        self.rawQuote = rawQuote
        self.book = bookName
        #quoteList.append(self)

    def addAuthor(self,author):
        self.authors.append(author)

    def info(self):
        print(self.quote+" on "+ self.date)
        print(self.authors)

class Author():
    def __init__(self,name,aliases):
        self.name = name 
        self.quotes = []
        self.date = ""
        totalAuthorList.append(self)
        self.aliases = aliases
        #self.aliases.append(name)
        listpos = 0
        while listpos < len(self.aliases):
            self.aliases[listpos] = self.aliases[listpos].lower()
            listpos +=1

    def scrambleQuotes(self):
        out = []
        while(len(self.quotes) !=1):
            current = random.randrange(0,len(self.quotes)-1)
            out.append(self.quotes[current])
            x = 0
            temp = []
            while x<len(self.quotes):
                if x != current:
                    temp.append(self.quotes[x])
                x+=1
            self.quotes = temp
        out.append(self.quotes[0])
        self.quotes = out


    def addQuote(self,quote):
        self.quotes.append(quote)

    def info(self):
        print("name = "+self.name)
        print("aliases = "+str(self.aliases))
        print(str(len(self.quotes))+" quotes = ")
        for x in self.quotes:
            print(x.rawQuote)
            #print(x.rawQuote+ " in book "+x.book+" on "+x.date)

# class Group:
#     def __init__(self,name,*people):
#         self.name = name
#         self.people = people

#     def removePerson(self,name):
#         if name in self.people:
#             self.people.remove(name)

#     def addPerson(self,name):
#         if name not in self.people:
#             self.people.append(name)

def parseBook(bookName):
    global unusedQuotes
    book = open(str(bookName),'r',encoding="utf8")

    totalBook = ""
    for x in book:
        totalBook+=x

    listpos = 0
    start = 0
    out = []
    while listpos < len(totalBook):
        if listpos <= len(totalBook)-4:
            if totalBook[listpos:listpos+1] == "\n":
                    if totalBook[listpos+1:listpos+2] == "\n":
                        out.append(totalBook[start:listpos])
                        start = listpos
        listpos +=1
    

    for x in out:
        quote = ""
        record = False
        authorRawString = ""
        totalRawString = ""
        date = ""
        for y in x:
            totalRawString+=y
            if y =='"':
                if record:
                    record = False
                    quote+="\""
                else:
                    record = True
            if record:
                quote+=y
            elif y.isdigit() or y =='/':
                date+=y
            else:
                authorRawString+=y

        totalRawString = totalRawString.lstrip("\n")
        authorRawString = authorRawString.lower()

        newQuote = Quote(quote,date,totalRawString,bookName)
        unusedQuote = True
        for z in authorList:
            usedAuthor = False
            #z.info()
            #print(z.name)
            for y in z.aliases:
                #print("Current alias = ."+y+".")
                if y in authorRawString and not usedAuthor:
                    #newQuote.info()
                    newQuote.addAuthor(z)
                    z.quotes.append(newQuote)
                    unusedQuote = False
                    usedAuthor = True
        if unusedQuote:
            unusedQuotes.append(newQuote)
            '''print(str(len(unusedQuotes)))
            print("!!ERROR!!: A quote has been parsed with no author")
            print("author =."+authorRawString+".")
            print(quote)
            print(date)
            print(newQuote)'''
            #print(x)
            
        
        '''print(quote)
        print(authorRawString)
        print(date)
        print()'''

        
        
        
    
    



def parseNames():
    names = open("Authors.txt",'r')
    #print(names)
    b = []
    for x in names:
        #print("x "+x)
        #x =x.replace('}','')
        x =x.replace('\n','')
        x = x.split(',')
        for y in x:
            #print(b)
            b.append(y)
        #print(x)
        a = Author(x[0],x)
    for x in b:
        getAuthor(x)


        
        '''if len(x) >1:
            y = x[1].split(',')
            a = Author(x[0],y)
            #print("newauthor" +a.name+" with aliases " + str(y))
        else:
            a = Author(x[0],[])
            #print("newauthor " +a.name)'''

def getAuthor(name):
    for x in totalAuthorList:
        #print(x.name+" "+ name)
        for y in x.aliases:
            if y.replace(" ","").lower() == name.replace(" ","").lower():
                return x
    if name != "pass" and name != "exit" and name != "skip":
        print("INVALID NAME: "+name)
        time.sleep(1)
        return Author("",[""])
        
    
def filterNames(filter):
    global authorList, quoteList
    authorList = []
    if filter == "*":
        for x in totalAuthorList:
            authorList.append(x)
    else:
        for x in filter:
            authorList.append(getAuthor(x))

    quoteList = []
    for x in authorList:
        for y in x.quotes:
            quoteList.append(y)

def filterDates(filter):
    pass

def flattenDate(date):
    out = date.split('/').trim()
    return out[0]+out[1]*12+out[2]*365

def unFlattenDate(date):
    out = date.split('/').trim()
    return out[0]+out[1]*12+out[2]*365

def displayQuoteInfo():
    reorderAuthorList("numQuotes")

    go = True
    while go:
        print("Please enter the name of the person whos info you would like to see, \"summary\" or enter \"exit\" to end:")
        ans = input()
        if ans == "exit":
            go = False
            print("exiting...")
            print("done")
        elif ans == "summary":
            quoteCount = 0
            for x in authorList:
                print(x.name+ " | "+str(len(x.quotes))+" quotes")
                quoteCount+=len(x.quotes)
            print("Displaying "+str(len(authorList))+" Authors with "+str(quoteCount)+" Quotes total")
        else:
            getAuthor(ans).info()
            print()

def loadGroups():
    groupFile = open("Groups.txt",'r')
    # print(groupFile)
    for x in groupFile:
        temp = x.split(' ')
        groupsDict[str(temp[0])] = temp[1:-1]

def saveGroups(filepath):
    groupsString = ""
    # print("groupsdict = "+str(groupsDict))
    for x in groupsDict.keys():
        groupsString+=x
        groupsString+=" "
        # print(groupsDict[x])
        for y in groupsDict[x]:
            groupsString+=y
            groupsString+=" "
        groupsString+='\n'
    with open(''+filepath, 'w') as file:
        file.write(groupsString)    



def reorderAuthorList(format):
    global authorList
    if format == "numQuotes":
        go = True
        while go:
            go = False
            for x in range(len(authorList)-1):
                if len(authorList[x].quotes) < len(authorList[x+1].quotes):
                    go = True
                    temp = authorList[x] 
                    authorList[x] = authorList[x+1]
                    authorList[x+1] = temp
    elif format == "alphabetical":
        pass
    else:
        print("!!ERROR!! Invalid format when reordering list: "+format)

def displayUnusedQuotes():
    global unusedQuotes
    print("Displaying "+ str(len(unusedQuotes))+" quotes")
    for x in unusedQuotes:
        print("!!ERROR!!: A quote has been parsed with no author")
        print("totalQuote = "+ x.rawQuote)
        print("author =. "+str(x.authors))
        print("Quote = " +x.quote)
        print("Date = "+x.date)
        print("Book = "+x.book)
        print()

def main():
    global quoteList
    running = True
    print("welcome to the Quote Book Game:\nEnter \"skip\" to get a different question or \"exit\" to exit :]") 
    quoteCount = 0
    authorCount = 0
    for x in authorList:
        quoteCount +=len(x.quotes)
        authorCount +=1
    correctCount = 0
    wrongCount = 0
    for x in range(20):
        print()
    print("You are playing with "+str(quoteCount)+" quotes from "+str(authorCount)+" authors.")
    while running:
        #print(len(quoteList))
        current = random.choice(quoteList)
        while current == '':
            current = random.choice(quoteList)
        print("Who said: \n"+str(current.quote)+" on "+str(current.date)+"?")
        ans = "pass"
        while getAuthor(ans) not in current.authors and ans != "exit" and ans != "skip":
            ans = input()
            if ans == "exit":
                running = False
            elif getAuthor(ans) not in current.authors and ans != "skip":
                print("Wrong answer, Please try again :]")
                wrongCount+=1
            elif getAuthor(ans) in current.authors and ans != "skip":
                authorString =""
                quoteList.remove(current)
                for x in range(len(current.authors)):
                    authorString+=current.authors[x].name
                    if x != len(current.authors)-1:
                        authorString+=" and "

                print("Correct. This quote was by "+authorString)
                correctCount +=1

            elif ans == "skip":
                for x in current.authors:
                    print(x.name+" said this")
                wrongCount += 1
            print()
    if correctCount+wrongCount !=0:
        print("Thanks for Playing :] \nYou guessed "+str(correctCount)+" correctly and missed "+str(wrongCount)+"\nYour accuracy was "+str(round(correctCount/(correctCount+wrongCount)*100,2))+"%")

def menu():
    goMenu = True
    loadGroups()
    while(goMenu):
        print("Welcome to the quote book: \n\t For the Quote Book Game enter 1.\n\t For Quote Book Analysis enter 2.\n\t For Name Filter enter 3.\n\t to exit enter exit.")
        comm = input()
        if comm == "1":
            main()
        elif comm == "2":
            if len(unusedQuotes) >0:
                print("Some quotes have been parsed incorrectly, press 1 to print them and 2 to ignore.")
                comm = input()
                if(str.lower(comm) == "1"):
                    displayUnusedQuotes()
            displayQuoteInfo()
        elif comm == "3":
            print("""To filter by group please enter the name of that group. \nTo create new group type \"add\".\nTo remove a group type \"remove\" followed by the group name.\nTo create a temporary group type \"temp\" followed by the members of this group.""")
            print("Current groups are:")
            for x in groupsDict:
                print(str(x)+": "+str(groupsDict[x]))
            print()
            comm = input()
            if str.lower(comm.split(" ")[0]) == "temp":
                filterNames(comm.split(" ")[1:])
            elif str.lower(comm.split(" ")[0]) == "add":
                print("Please enter the name of the new group, followed by its members")
                comm = input()
                groupsDict[str(comm.split(" ")[0])] = comm.split(" ")[1:]
            elif str.lower(comm.split(" ")[0]) == "remove":
                groupsDict.pop(comm.split(" ")[1])
            elif str.lower(comm.split(" ")[0]) in groupsDict.keys():
                # print(groupsDict)
                filterNames(groupsDict[comm.split(" ")[0]])
            else:
                filterNames("*")
        elif str.lower(comm) == "exit":
            goMenu = False
            saveGroups("Groups.txt")

unusedQuotes = []
totalAuthorList = []
authorList = []
quoteList = []
groupsDict = {}
dunedinList = ["lara","padget","august","maleesha","pyper","Krish","raihan","david","mac"]
#whangareiList = ["riki","ev","bella","isabela","rohit","ayana","helena","sam","seamus","dezmond","mr gebbett","hudson","ob","mutsa","raja","lucy","hannah","tobias","taron","cj","giverney","cam","zac","emily","nate","ilil","takai","ms wong","gaia","naira","arla","linguini","mother","jasper","rome","clara","ryan"]
whangareiList = ["sam","seamus","taron","emily","giverny"]
clList = ["Reuben","Stephanie","Sam","zoe","august","sterling","lucy","pyper","sophie","hetanshi","amike"]
georgeList = ["sam","evan","helena","emily","taron"]
parseNames()
filterNames("*")
#print("a - "+str(authorList))
parseBook("Quotes.txt")
# parseBook("Quote1.txt")
# parseBook("Quote2.txt")
# parseBook("Quote3.txt")
# parseBook("Quote4.txt")
# parseBook("Quote5.txt")
#parseBook("\testing.txt")

filterNames("*")
#Dunedin Filterexit
#filterNames(["lara","padget","august","maleesha","pyper","Krish","raihan","david","mac"])

#Whangarei Filter
#filterNames(["riki","ev","bella","isabela","rohit","ayana","helena","sam","seamus","dezmond","mr gebbett","hudson","ob","mutsa","raja","lucy","hannah","tobias","taron","cj","giverney","cam","zac","emily","nate","ilil","takai","ms wong","gaia","naira","arla","linguini","mother","jasper","rome","clara","ryan"])

#temp 
#filterNames(["sam", "seamus","taron","emily","giverny"])

#testfilter
#filterNames(['ev'])
#print(authorList)
'''for x in authorList:
    print(x.name+" "+str(len(x.quotes)))
    for y in x.quotes:
        print(y.quote)
    print()'''
#getAuthor("jaymi").info()
#getAuthor("ayana").scrambleQuotes()
#getAuthor("rohit").info()
'''for x in authorList:
    x.info()
    print()'''
#displayQuoteInfo()
#main()
#print("Thanks for playing :]")
menu()

'''starWars = "A long time ago in a galaxy far far away"
out = [str.upper(x) for x in str.split(starWars," ") if len(x)>=4]
print(out)'''
