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
            if (search.length === 0) 
            {
                var all = true;
                
                httpRequest.open ('GET', url + '&all=' + all);
                httpRequest.send ();
            }
            else
            {
                alert ("Revise: Please select either all or enter a search value");
            }
        }
        else 
        {   
            if (search.length > 0) 
            {
                httpRequest.open ('GET', url + 'country=' + encodeURIComponent(search));
                httpRequest.send ();
            }
            else 
            {
                alert ("Please enter a search value");
            }
        }
         
        
    }
    
    function displayInfo ()
    {
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
                    var response = httpRequest.responseText; 
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