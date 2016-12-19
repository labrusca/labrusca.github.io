'''
manage.py [option]

[option]:
          - new
          - del [-rf] [file]
          - push
Use like: "manage.py del 2016-12-24-1400"

Test on python3(fedora 25)
Author: Labrusca'''
import sys
import os
import time
import json


def setfile():
    ''' Rename the file use datetime '''
    global filetime
    filetime = time.strftime("%Y-%m-%d-%H%M", time.localtime())
    os.rename('./articles/new.md','./articles/%s.md' % filetime)
    print('Renamed new.md to %s.md' % filetime)

def rebuildjson(dictinfo):
    ''' Add new data to data.json '''
    dictinfo['time'] = filetime
    f = open('data.json','r+')
    ogdata = json.load(f)['articles']
    ogdata.insert(0,dictinfo)
    newdata = {"articles": ogdata}
    f.seek(0)
    # Use json.dumps() to format JSON
    wdata = json.dumps(newdata,indent=2)  
    f.write(wdata)
    f.close()


def getinfo(f):
    ''' Get&delete infomation from file '''
    ld = f.readline()
    info = {"title": None,"tags": None}
    while not (info['title'] and info['tags']):
        if ld.startswith('[TITLE]:'):
            info['title'] = ld.split('[TITLE]')[1][1:-1]
        elif ld.startswith('[TAGS]:'):
            tagsstr = ld.split('[TAGS]')[1][1:-1]
            info['tags'] = tagsstr.split(',')
        ld = f.readline()
    return info

def pushmd():
    ''' Add new markdown blog file '''
    try:
        tempfile = open('./articles/new.md','r')
    except IOError:
        print('Can\'t find the file new.md,please check!\n')
        exit(0)
    fileinfo = getinfo(tempfile)
    tempfile.close()
    setfile()
    rebuildjson(fileinfo)
    print('Rebuilt data.json at %s' % time.asctime(time.localtime()))

def deleteblog(filename):
    f = open('data.json','r+')
    ogdata = json.load(f)['articles']
    for each in ogdata:
        if each['time'] == filename:
            del each
            break
    newdata = {"articles": ogdata}
    f.seek(0)
    # Use json.dumps() to format JSON
    wdata = json.dumps(newdata,indent=2)  
    f.write(wdata)
    f.close()
    print("Removed from data.json done.")

def updata():
    ''' Updata all markdown file into data.json '''
    # check if new.md
    try:
        setfile()
    except FileNotFoundError:
        pass
    mdlist = os.listdir('./articles')
    for mdeach in mdlist:
        f = open(mdeach,'r')
        rebuildjson(getinfo(f))
        f.close()


if __name__ == "__main__":
    if len(sys.argv) == 1:
        print(__doc__)
    else:
        if sys.argv[1] == 'push':
            pushmd()
        elif sys.argv[1] == 'del':
            if sys.argv[2] == '-rf':
                deleteblog(sys.argv[3])
                os.system("rm ./articles/{0}.md".format(sys.argv[3]))
                print("The markdown file has been deleted!")
            else:
                deleteblog(sys.argv[2])

        elif sys.argv[1] == 'new':
            open('./articles/new.md','w')
            os.system("vi ./articles/new.md")
        elif sys.argv[1] == 'updata':
            updata()
