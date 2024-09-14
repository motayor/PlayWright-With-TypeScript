

//import the fixture you just created
import { testMe } from "./myFixtures";


testMe('This is a fixture demo test', async ({age, email}) => {
    console.log("User's age: " + age + " and email: " +email.toUpperCase());
}) 