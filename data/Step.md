The function starts by checking if the ticketData object has a property that matches the ticketType in the ticketInfo object. This is done using the hasOwnProperty() method, which checks if an object has a specific property.

If the first check is true, it then checks if the property found in step 1 has a property of priceInCents that matches the entrantType in the ticketInfo object. This is done by chaining the hasOwnProperty() method, so the function is checking if the property found in step 1 has a priceInCents property, and if that property has a property that matches the entrantType in the ticketInfo object.

If both of the above checks are true, the function proceeds to initialize a variable named "extrasPrice" with a value of 0. This variable will be used later to keep track of the total cost of any extra options chosen.

The function then starts a for loop to iterate through the extras array in the ticketInfo object. This loop will go through each item in the extras array and check if it's a valid option.

Within the for loop, it checks if the extras can be found in the ticketData object. This is done using the hasOwnProperty() method again, checking if the ticketData object has a property that matches the current extra from the extras array.

If the extra is found in the ticketData object, it adds the priceInCents for that extra to the extrasPrice variable. This is done by getting the priceInCents property of the extra and adding it to the extrasPrice variable.

If the extra type cannot be found in the ticketData object, the function returns a string with the invalid extra. This is done by returning a string with the extra that could not be found, so that the user knows which extra is invalid.

After the for loop, the function returns the sum of the priceInCents for the ticketType and entrantType and the extrasPrice. This is done by getting the priceInCents property of the ticketType and entrantType, and adding it to the extrasPrice variable that was calculated in the for loop.

If the ticketType cannot be found in the ticketData object, the function returns a string with the invalid type. This is done by returning a string with the ticketType that could not be found, so that the user knows which type of ticket is invalid.

If the entrantType cannot be found in the ticketData object, the function also returns a string with the invalid type. This is done by returning a string with the entrantType that could not be found, so that the user knows which type of entrant is invalid.
