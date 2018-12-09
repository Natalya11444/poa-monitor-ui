# poa-monitor-ui

Moved to https://github.com/poanetwork/poa-network-monitor
---
User interface for the <a href="https://github.com/Natalya11444/poa-network-monitor">poa-network-monitor</a>.<br>
Calls web service of the poa-network-monitor with parameters from the search form and displays received result.
Domain name of the web server is taken them the .env file.
<h3>Installation</h3>
1.Deploy <a href="https://github.com/Natalya11444/poa-network-monitor">poa-network-monitor</a> <br>
2.Clone Github repository:

```sh
git clone https://github.com/Natalya11444/poa-monitor-ui.git
```
3.Install dependencies 

```sh
cd poa-monitor-ui 
npm install
```
4.Rename <code>.env-sample</code> file to the <code>.env</code>. <br>
Specify domain name of the deployed poa-network-monitor int the .env file. Port number can be changed there too.
<h3>Run</h3>

```sh
npm start
```
