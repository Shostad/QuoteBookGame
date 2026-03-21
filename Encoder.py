morseDict = {"a":".-",
             "b":"-...",
             "c":"-.-.",
             "d":"-..",
             "e":".",
             "f":"..-.",
             "g":"--.",
             "h":"....",
             "i":"..",
             "j":".---",
             "k":"-.-",
             "l":".-..",
             "m":"--",
             "n":"-.",
             "o":"---",
             "p":".--.",
             "q":"--.-",
             "r":".-.",
             "s":"...",
             "t":"-",
             "u":"..-",
             "v":"...-",
             "w":".--",
             "x":"-..-",
             "y":"-.--",
             "z":"--..",
             " ":"/",
             ",":"--..--",
             ".":".-.-.-",
             "?":"..--..",
             "'":".----.",
             "!":"-.-.--",
             ",":"--..--",
             '\n':'  '
             }



def encodeWithDict(dict, text):
    encodedTextAsArray = []
    for x in text:
        encodedTextAsArray.append(dict[x])
    return " ".join(encodedTextAsArray)

def decodeWithDict(dict, text):
    invertedDict = {value: key for key, value in dict.items()}
    encodedTextAsArray = []
    for x in text.split(' '):
        encodedTextAsArray.append(invertedDict[x])
    return "".join(encodedTextAsArray)


print(encodeWithDict(morseDict,"sos"))
print(decodeWithDict(morseDict,encodeWithDict(morseDict,"sos")))

