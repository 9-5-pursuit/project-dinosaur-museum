/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. 
 * See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` 
 * key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
    function calculateTicketPrice(tickets, ticketInfo) {
   
     if(ticketInfo.ticketType !== "general" && ticketInfo.ticketType !== "membership"){
        return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
      }

      else if(ticketInfo.entrantType !== "adult" && ticketInfo.entrantType !== "child" && ticketInfo.entrantType !== "senior"){
        return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
      }

      else{
        for(let i=0; i < ticketInfo.extras.length;i++){
          if (ticketInfo.extras[i] !== "movie" && ticketInfo.extras[i] !=="education" && ticketInfo.extras[i] !=="terrace"){
            return `Extra type '${ticketInfo.extras[i]}' cannot be found.`
          } 
        } 
      }
    
      let total = 0;
      if(ticketInfo.ticketType === "general" && ticketInfo.extras.length === 0){
        if(ticketInfo.entrantType === "adult"){
          total += tickets.general.priceInCents.adult;
        }
        else if(ticketInfo.entrantType === "child"){
          total += tickets.general.priceInCents.child;
        }
        else {
          total += tickets.general.priceInCents.senior;
        }
        
      }

      else if(ticketInfo.ticketType === "membership" && ticketInfo.extras.length === 0){
        if(ticketInfo.entrantType === "adult"){
          total += tickets.membership.priceInCents.adult;
        }
        else if(ticketInfo.entrantType === "child"){
          total += tickets.membership.priceInCents.child;
        }
        else {
          total += tickets.membership.priceInCents.senior;
        } 
      }

      else if(ticketInfo.ticketType === "general" && ticketInfo.extras.length === 1){
        if(ticketInfo.entrantType === "adult"){
          total += (tickets.general.priceInCents.adult + tickets.extras.movie.priceInCents.adult);
        }
        else if(ticketInfo.entrantType === "child"){
          total += (tickets.general.priceInCents.child + tickets.extras.movie.priceInCents.child);
        }
        else {
          total += (tickets.general.priceInCents.senior + tickets.extras.movie.priceInCents.senior);
        }  
      }

      else if(ticketInfo.ticketType === "membership" && ticketInfo.extras.length === 1){
        if(ticketInfo.entrantType === "adult"){
          total += (tickets.membership.priceInCents.adult + tickets.extras.movie.priceInCents.adult);
        }
        else if(ticketInfo.entrantType === "child"){
          total += (tickets.membership.priceInCents.child + tickets.extras.movie.priceInCents.child);
        }
        else {
          total += (tickets.membership.priceInCents.senior + tickets.extras.movie.priceInCents.senior);
        }  
      }

      else if(ticketInfo.ticketType === "general" && ticketInfo.extras.length === 2){
        if(ticketInfo.extras.includes("movie") && ticketInfo.extras.includes("education")){
          if(ticketInfo.entrantType === "adult"){
            total += (tickets.general.priceInCents.adult + tickets.extras.movie.priceInCents.adult + tickets.extras.education.priceInCents.adult);
          }
          else if(ticketInfo.entrantType === "child"){
            total += (tickets.general.priceInCents.child + tickets.extras.movie.priceInCents.child + tickets.extras.education.priceInCents.child);
          }
          else{
            total += (tickets.general.priceInCents.senior + tickets.extras.movie.priceInCents.senior + tickets.extras.education.priceInCents.senior);
          }
        }
        else if(ticketInfo.extras.includes("education") && ticketInfo.extras.includes("terrace")){
          if(ticketInfo.entrantType === "adult"){
            total += (tickets.general.priceInCents.adult + tickets.extras.terrace.priceInCents.adult + tickets.extras.education.priceInCents.adult);
          }
          else if(ticketInfo.entrantType === "child"){
            total += (tickets.general.priceInCents.child + tickets.extras.terrace.priceInCents.child + tickets.extras.education.priceInCents.child);
          }
          else {
            total += (tickets.general.priceInCents.senior + tickets.extras.terrace.priceInCents.senior + tickets.extras.education.priceInCents.senior);
          }
        }
      }
      
      else if(ticketInfo.ticketType === "membership" && ticketInfo.extras.length === 2){
        if(ticketInfo.extras.includes("movie") && ticketInfo.extras.includes("education")){
          if(ticketInfo.entrantType === "adult"){
            total += (tickets.membership.priceInCents.adult + tickets.extras.movie.priceInCents.adult + tickets.extras.education.priceInCents.adult);
          }
          else if(ticketInfo.entrantType === "child"){
            total += (tickets.membership.priceInCents.child + tickets.extras.movie.priceInCents.child + tickets.extras.education.priceInCents.child);
          }
          else{
            total += (tickets.membership.priceInCents.senior + tickets.extras.movie.priceInCents.senior + tickets.extras.education.priceInCents.senior);
          }
        }
        else if(ticketInfo.extras.includes("education") && ticketInfo.extras.includes("terrace")){
          if(ticketInfo.entrantType === "adult"){
            total += (tickets.membership.priceInCents.adult + tickets.extras.terrace.priceInCents.adult + tickets.extras.education.priceInCents.adult);
          }
          else if(ticketInfo.entrantType === "child"){
            total += (tickets.membership.priceInCents.child + tickets.extras.terrace.priceInCents.child + tickets.extras.education.priceInCents.child);
          }
          else {
            total += (tickets.membership.priceInCents.senior + tickets.extras.terrace.priceInCents.senior + tickets.extras.education.priceInCents.senior);
          }
        }
      }

      else if(ticketInfo.ticketType === "general" && ticketInfo.extras.length === 3){
        if(ticketInfo.entrantType === "adult"){
          total += (tickets.general.priceInCents.adult + tickets.extras.terrace.priceInCents.adult + tickets.extras.education.priceInCents.adult + tickets.extras.movie.priceInCents.adult);
        }
        else if(ticketInfo.entrantType === "child"){
          total += (tickets.general.priceInCents.child + tickets.extras.terrace.priceInCents.child + tickets.extras.education.priceInCents.child + tickets.extras.movie.priceInCents.child);
        }
        else {
          total += (tickets.general.priceInCents.senior + tickets.extras.terrace.priceInCents.senior + tickets.extras.education.priceInCents.senior +tickets.extras.movie.priceInCents.senior);
        }
      } 

      else if(ticketInfo.ticketType === "membership" && ticketInfo.extras.length === 3){
        if(ticketInfo.entrantType === "adult"){
          total += (tickets.membership.priceInCents.adult + tickets.extras.terrace.priceInCents.adult + tickets.extras.education.priceInCents.adult + tickets.extras.movie.priceInCents.adult);
        }
        else if(ticketInfo.entrantType === "child"){
          total += (tickets.membership.priceInCents.child + tickets.extras.terrace.priceInCents.child + tickets.extras.education.priceInCents.child + tickets.extras.movie.priceInCents.child);
        }
        else {
          total += (tickets.membership.priceInCents.senior + tickets.extras.terrace.priceInCents.senior + tickets.extras.education.priceInCents.senior +tickets.extras.movie.priceInCents.senior);
        }
      } 
  return total;
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n
    -------------------------------------------\n
    Adult General Admission: $50.00 (Movie Access, Terrace Access)\n
    Senior General Admission: $35.00 (Terrace Access)\n
    Child General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n
    Child General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n
    -------------------------------------------\n
    TOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
    function purchaseTickets(tickets, purchases) {

      let adminDetails = "";
      let total = 0;
      
      for( i = 0; i < purchases.length; i++){ 

         let genralAdultAdmission = (purchases[i].ticketType === "general" && purchases[i].entrantType === "adult" && purchases[i].extras.length === 0)
         let genralChildAdmission = (purchases[i].ticketType === "general" && purchases[i].entrantType === "child" && purchases[i].extras.length === 0)
         let genralSeniorAdmission = (purchases[i].ticketType === "general" && purchases[i].entrantType === "senior" && purchases[i].extras.length === 0)
          
        if(genralAdultAdmission){
            
          let word = purchases[i].entrantType;
          let generalAdultPrice = (tickets.general.priceInCents.adult/100);
          word = `${word.charAt(0).toUpperCase()}${word.slice(1)} ${tickets.general.description}: $${generalAdultPrice.toFixed(2)}\n` 
        
          adminDetails += word
          total += generalAdultPrice ;
          
        }
        if(genralChildAdmission ){
            
          let word = purchases[i].entrantType;
          let generalChildPrice = (tickets.general.priceInCents.child/100);
          word = `${word.charAt(0).toUpperCase()}${word.slice(1)} ${tickets.general.description}: $${generalChildPrice.toFixed(2)}\n` 
        
          adminDetails += word
          total += generalChildPrice ;
        }

        if(genralSeniorAdmission){
            
          let word = purchases[i].entrantType;
          let generalSeniorPrice = (tickets.general.priceInCents.senior/100);
          word = `${word.charAt(0).toUpperCase()}${word.slice(1)} ${tickets.general.description}: $${generalSeniorPrice.toFixed(2)}\n` 
        
          adminDetails += word
          total += generalSeniorPrice ;
        }

     let membershipAdultAdmission = (purchases[i].ticketType === "membership" && purchases[i].entrantType === "adult" && purchases[i].extras.length === 0)
     let membershipChildAdmission = (purchases[i].ticketType === "membership" && purchases[i].entrantType === "child" && purchases[i].extras.length === 0)
     let membershipSeniorAdmission = (purchases[i].ticketType === "membership" && purchases[i].entrantType === "senior" && purchases[i].extras.length === 0)
      
    if(membershipAdultAdmission){
        
         let word = purchases[i].entrantType;
         let membershipAdultPrice = (tickets.membership.priceInCents.adult/100);
         word = `${word.charAt(0).toUpperCase()}${word.slice(1)} ${tickets.membership.description}: $${membershipAdultPrice.toFixed(2)}\n` 
    
        adminDetails += word
        total += membershipAdultPrice ;
      
    }
       if(membershipChildAdmission){
        
         let word = purchases[i].entrantType;
         let membershipChildPrice = (tickets.membership.priceInCents.child/100);
         word = `${word.charAt(0).toUpperCase()}${word.slice(1)} ${tickets.membership.description}: $${membershipChildPrice.toFixed(2)}\n` 
    
        adminDetails += word
        total += membershipChildPrice ;
      
    }
      if(membershipSeniorAdmission){
        
         let word = purchases[i].entrantType;
         let membershipSeniorPrice = (tickets.membership.priceInCents.senior/100);
         word = `${word.charAt(0).toUpperCase()}${word.slice(1)} ${tickets.membership.description}: $${membershipSeniorPrice.toFixed(2)}\n` 
    
        adminDetails += word
        total += membershipSeniorPrice ;
      
    }
    
     let genralAdultAdmission_OneExtra = (purchases[i].ticketType === "general" && purchases[i].entrantType === "adult" && purchases[i].extras.length === 1)
    
     if(genralAdultAdmission_OneExtra){
       if(purchases[i].extras.includes("movie")){
         
         let word = purchases[i].entrantType;
         let generalAdultPrice = (tickets.general.priceInCents.adult + tickets.extras.movie.priceInCents.adult) /100;
         word = `${word.charAt(0).toUpperCase()}${word.slice(1)} ${tickets.general.description}: $${generalAdultPrice.toFixed(2)} (Movie Access)\n` 
    
        adminDetails += word
        total += generalAdultPrice ;
      
         
       }
       else if(purchases[i].extras.includes("education")){
         
         let word = purchases[i].entrantType;
         let generalAdultPrice = (tickets.general.priceInCents.adult + tickets.extras.education.priceInCents.adult) /100;
         word = `${word.charAt(0).toUpperCase()}${word.slice(1)} ${tickets.general.description}: $${generalAdultPrice.toFixed(2)} (Education Access)\n` 
    
        adminDetails += word
        total += generalAdultPrice ;
      
         
       }
       else {
         let word = purchases[i].entrantType;
         let generalAdultPrice = (tickets.general.priceInCents.adult + tickets.extras.terrace.priceInCents.adult) /100;
         word = `${word.charAt(0).toUpperCase()}${word.slice(1)} ${tickets.general.description}: $${generalAdultPrice.toFixed(2)} (Terrace Access)\n` 
    
        adminDetails += word
        total += generalAdultPrice ;
      
       }
       
     }
       
     }
  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${adminDetails}-------------------------------------------\nTOTAL: $${total.toFixed(2)}`;
}
      
// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
