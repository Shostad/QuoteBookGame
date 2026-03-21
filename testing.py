import math
def flattenDate(date):
    out = date.strip().split('/')
    return int(out[0])+int(out[1])*12+int(out[2])*365

def unFlattenDate(date):
    years = math.floor(date/365)
    months = math.floor((date-365*years)/12)
    days = math.ceil((date-365*years-12*months)/12)
    #print((date-365*years-12*months)/12)
    return str(days)+'/'+str(months)+'/'+str(years)

def testFlatten():
    count = 0
    wins = 0
    for x in range(25):
        for y in range(12):
            for z in range(31):
                start = str(z)+'/'+str(y)+'/'+str(x)
                final = unFlattenDate(flattenDate(start))
                if start == final:
                    wins+=1
                    print(start+'\t'+final+'\t'+'Y')
                else:
                    print(start+'\t'+final+'\t'+'N')
                count+=1
    print()
    print("Finished with "+str(count/wins)+"%")
#print(flattenDate("1/1/1"))
# #/print(unFlattenDate(flattenDate("1/1/1")))
testFlatten()