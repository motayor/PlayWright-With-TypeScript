

import {test as myTest, expect} from '@playwright/test';

//specify the type of your fixture onbjects
type oluTest = {
    age: number,
    email: string
}

//extend the myTest fixture
const myTestFixture = myTest.extend<oluTest>({
    age: 27,
    email: 'users@olu.com'
 })

 //export the fixture as...
 export const testMe = myTestFixture;

