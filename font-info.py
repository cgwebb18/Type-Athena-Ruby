import xml.etree.ElementTree as etree

doc = etree.parse('Athena-Ruby-MasterXML.xml')

root = doc.getroot()

with open('results.xml', 'w') as f:
    for child in root:
        for child2 in child:
            file.write(f, str(child2.text) + '\n')

# with open('results.xml', 'w') as f:
#     doc.write('results.xml')
#     f.close()
