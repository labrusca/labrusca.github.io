'''
manage.py 
Test on python3(fedora 25)
Author: Labrusca'''

import os
import time
import json
from sys import argv


def setfilename():
    ''' Rename the file use datetime '''
    global filetime
    filetime = time.strftime("%Y-%m-%d-%H%M", time.localtime())
    os.rename('./articles/new.md','./articles/%s.md' % filetime)
    print('Renamed new.md to %s.md' % filetime)

def addtojson(dictinfo):
    ''' Add new data to data.json '''
    dictinfo['time'] = filetime
    f = open('data.json','r+')
    try:
        ogdata = json.load(f)['articles']
    except e:
        print(e)
        return
    for n in range(0,len(ogdata)):
        if dictinfo['time'] > ogdata[n]['time']:
            ogdata.insert(n,dictinfo)
            break
        elif n == len(ogdata)-1:
            ogdata.appent(dictinfo)
    newdata = {"articles": ogdata}
    f.seek(0)
    # Use json.dumps() to format JSON
    wdata = json.dumps(newdata,indent=2)  
    f.write(wdata)
    f.close()
    print('Add data.json at %s' % time.asctime(time.localtime()))

def getinfo(f):
    ''' Get&delete infomation from file '''
    ld = f.readline()
    info = {"title": None,"tags": None,"abstract": None}
    while not (info['title'] and info['tags'] and info['abstract']):
        if ld.startswith('[TITLE]:'):
            info['title'] = ld.split('[TITLE]')[1][1:-1]
        elif ld.startswith('[TAGS]:'):
            tagsstr = ld.split('[TAGS]')[1][1:-1]
            info['tags'] = tagsstr.split(',')
        elif ld.startswith('> '):
            info['abstract'] = ld.split('> ')[1][1:-1]
        ld = f.readline()
    return info

def postmd():
    ''' Add new markdown blog file '''
    try:
        tempfile = open('./articles/new.md','r')
    except IOError:
        print('Can\'t find the file new.md,please check!\n')
        exit(0)
    fileinfo = getinfo(tempfile)
    tempfile.close()
    setfilename()
    addtojson(fileinfo)
    print('Push done at %s' % time.asctime(time.localtime()))

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
    # check if have new.md
    try:
        setfilename()
    except FileNotFoundError:
        pass
    mdlist = os.listdir('./articles')
    for mdeach in mdlist:
        f = open(mdeach,'r')
        addtojson(getinfo(f))
        f.close()


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('new')
    parser.add_argument('post')
    args = parser.parse_args()
    if args.post:
        print("testing passed.")
        print(args.post)