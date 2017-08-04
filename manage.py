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

class Article:
    def __init__(self):
        self.fileinfo = {"title": None,"tags": None,"abstract": None}

    def post(self):
        ''' Add new markdown blog file '''
        try:
            self.fileobj = open('./articles/new.md','r', encoding='utf-8')
        except IOError:
            print('Can\'t find the file new.md,please check!\n')
            exit(0)
        self.getinfo()
        self.fileobj.close()
        setfilename()
        self.addtojson()
        print('Push done at %s' % time.asctime(time.localtime()))

    def getinfo(self):
        ''' Get&delete infomation from file '''
        ld = self.fileobj.readline()
        while not (self.fileinfo['title'] and self.fileinfo['tags'] and self.fileinfo['abstract']):
            if ld.startswith('[TITLE]:'):
                self.fileinfo['title'] = ld.split('[TITLE]')[1][1:-1]
            elif ld.startswith('[TAGS]:'):
                tagsstr = ld.split('[TAGS]')[1][1:-1]
                self.fileinfo['tags'] = tagsstr.split(',')
            elif ld.startswith('> '):
                self.fileinfo['abstract'] = ld.split('> ')[1][1:-1]
            ld = self.fileobj.readline()
        return 1

    def addtojson(self):
        ''' Add new data to data.json '''
        self.fileinfo['time'] = filetime
        f = open('data.json','r+')
        try:
            ogdata = json.load(f)['articles']
        except e:
            print(e)
            return
        for n in range(0,len(ogdata)):
            if self.fileinfo['time'] > ogdata[n]['time']:
                ogdata.insert(n,self.fileinfo)
                break
            elif n == len(ogdata)-1:
                ogdata.appent(self.fileinfo)
        newdata = {"articles": ogdata}
        f.seek(0)
        # Use json.dumps() to format JSON
        wdata = json.dumps(newdata,indent=2)  
        f.write(wdata)
        f.close()
        print('Add data.json at %s' % time.asctime(time.localtime()))

    def updata(self):
        ''' Updata all markdown file into data.json '''
        # check if have new.md
        try:
            setfilename()
        except FileNotFoundError:
            pass
        mdlist = os.listdir('./articles')
        for mdeach in mdlist:
            self.fileobj = open(mdeach,'r')
            self.addtojson()
            self.fileobj.close()

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('action',type=str)
    args = parser.parse_args()
    if args.action == 'post':
        pub = Article()
        pub.post()
    elif args.action == 'new':
        try:
            newfile = open('./articles/new.md','r')
            print('The file: new.md had been created.')
        except FileNotFoundError:
            newfile = open('./articles/new.md','w')
            print('new.md created,enjoy it!')
        newfile.close