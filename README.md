# Demo of stuck test execution

Steps to reproduce the issue:

1) Clone the project
2) Run `npm install`
3) Run `npm run demo-test`
   1) At this point, the execution will get stuck.

**PS: This project is using codeceptjs 3.4.0**

**PS2: If you change the version to 3.3.7 and run `npm install` again, the execution won't get stuck anymore.**