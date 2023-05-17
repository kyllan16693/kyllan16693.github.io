#Read in Acronyms.txt with the format XX - XXXX XXXX
#replace all the " - " with a comma and leave a comma at the end of every line
#write to Acronyms.csv
def replace():
    with open('Acronyms.txt', 'r') as file:
        filedata = file.read()
        filedata = filedata.replace(' - ', ',')
        filedata = filedata.replace('\n', ',')
    with open('Acronyms.csv', 'w') as file:
        file.write(filedata)


#read in csv and print out with no commas and newline after each 
#csv is has 2 columns, acronym and definition

def read():
    with open('Acronyms.csv', 'r') as file:
        for line in file:
            print(line)




#replace()
read()