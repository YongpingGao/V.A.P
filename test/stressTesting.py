import urllib.request
import time

numOfRequests = 1000

def makeRequests(numOfRequests):
    for index in range(numOfRequests):
        f = urllib.request.urlopen('http://173.255.114.91:8080')
        if index == 0:
            initialCode = f.getcode()
        if index == numOfRequests - 1:
            endCode = f.getcode()
        index += 1
    return [initialCode, endCode]

print('V.A.P -> Stress testing... Please wait...')
startTime = time.time()
results = makeRequests(numOfRequests)
elapsedTime = time.time() - startTime

requestsPerSecond = numOfRequests / elapsedTime
systemIsUp = results[0] == results[1]

print()
print(str(numOfRequests) + ' requests are sent...')
print('It takes ' + str(elapsedTime) + ' seconds: ')
print('Number of requests per second: ' + str(requestsPerSecond))
if systemIsUp:
    print('server is still working properly...')
else:
    print('Oops, server is down')

