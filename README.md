### INTRO

Small Node.js CLI tool that help you tracking and forming a Habit (Or quitting a bad habit) - Your Data will be stored on your firebase's database. So you can used it on different computer.

### USAGE

1. Clone this project 
2. Install dependencies by execute `npm install`
3. Setup Your Firebase Account.
4. Generate and download your firebase-admin-sdk.json from Firebase Dashboard.
5. Setup Project for the 1st time.

### Setup Project for the 1st time

```
habit-builder --email=$email --password=$password --jsonFilePath=/path/to/file.json --apiKey=$apiKey
```

with `jsonFilePath` is path to your firebase-admin-sdk.json file and `apiKey` is your Project's API Key from Firebase.

#### Arguments List

```
habit-builder --help
``` 

#### List all habits

```
habit-builder --list
``` 

![List](http://image.prntscr.com/image/a9b0a58c37fa41ac9adbcdadc5c4f298.png)

#### Add a habit

```
habit-builder --add=$habitName
```

![Add a habit](http://image.prntscr.com/image/9b076f7c5a234c6e99974acb1c3477ac.png)

#### Log a habit

```
habit-builder --habit=$habitKey --tick --days=1 
```

![Log a habit](http://image.prntscr.com/image/ae50b36393c440c59fd8ff5c2f9a4fb5.png)

#### Show a habit

```
habit-builder --habit=$habitKey --show
``` 

![Show](http://image.prntscr.com/image/dd492e55ea1d472ab2e37629b98484ec.png)