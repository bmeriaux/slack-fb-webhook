#Slack to FB Webhook

This webhook gives the ability to post on Facebook from a slack command
It uses phantomJs to browse like a real user and avoid the limitations of the Facebook Api (post on private groupe, is not possible anymore)

##How to use it:
- override default configuration with your slack teamId, slack command Tokens, and Facebook credentials:
    - create a file configuration_custom.json in config folder and paste the content from configuration_default.json

- Open the project configuration file
```
$ vim configuration_custom.json

>  "fb": {
>      "login": "toto",
>     "password": "toto"
>    }
```
- exports the path of your configuration file in the SLACK_FB_HOOK_CONFIG_PATH env variable
```
$ exports SLACK_FB_HOOK_CONFIG_PATH='path\configuration_custom.json'
```

- Run in a terminal
```
$ ./node_modules/node_modules/phantomjs-prebuilt/bin/phantomjs --webdriver=4444
$ npm install
$ npm start
```

##Requirements:

- Node v4.5
- a valid Facebook account
- a slack _team_
