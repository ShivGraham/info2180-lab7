'use strict';

window.onload = function ()
{
    var lookupBtn = document.getElementById ('lookup');
    var results = document.getElementById ('result');
    var checkBox = document.getElementById('all');
    var url = 'https://info2180-lab7-s-graham.c9users.io/world.php?';
    var httpRequest;
    
    lookupBtn.onclick = function ()
    {
        var search = document.querySelector ('#country').value;
        
        httpRequest = new XMLHttpRequest ();
        
        if (!httpRequest)
        {
            alert ("Something went wrong!");
            return false;
        }
        
        httpRequest.onreadystatechange = displayInfo;
        
        if (checkBox.checked === true)
        {
            if (search.length === 0) //ensures that no text is entered in the text box
            {
                var all = true;
                
                //appends 'all=true' to the url and uses the get method
                httpRequest.open ('GET', url + '&all=' + all);
                httpRequest.send ();
            }
            else
            {
                alert ("Revise: Please select either all or enter a search value");
            }
        }
        else //if the check box has not been checked
        {   
            if (search.length > 0) //ensures that text has been entered in the text box
            {
                //encodes the search value and appends it to the url and the get method
                httpRequest.open ('GET', url + 'country=' + encodeURIComponent(search));
                httpRequest.send ();
            }
            else //if no text has been entered into the text box
            {
                alert ("Please enter a search value");
            }
        }
    }
    
    /*
        This function retrieves and displays either information on all the countries or on a specific country.
    */
    function displayInfo ()
    {
        //clears the text in the results section if present
        while (results.innerHTML.length > 0)
        {
            results.innerHTML = '';
        }
        
        try
        {
            if (httpRequest.readyState === XMLHttpRequest.DONE)
            {
                if (httpRequest.status === 200)
                {
                    var response = httpRequest.responseText; //retrieves regular text
                    results.innerHTML = response;
                }
                else
                {
                    alert ("HTTP REQUEST FAILURE!");
                }
            }
        }
        catch (e)
        {
            alert ("An exception was caught: " + e.description);
        }
    }
}
