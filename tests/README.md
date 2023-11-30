## Steps for Testing

### Integration testing

- Provide `username`, `password` and `email` in order to create the user (there are variables created pass them there)
- Here you will recieve a token in the console please copy that token because that we will be needing for unit testing

```
npx jest tests/integration/integration.test.js
```

### Unit Testing

- Paste the token in the `testToken` variable
- _Note_: For update and delete testing in unit testing please check the id and give the id as per your goal id.

```
npx jest tests/unit/secureController.test.js
```
