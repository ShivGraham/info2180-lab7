'use strict';

window.onload = function ()
{
    var lookupBtn = document.getElementById ('lookup');
    var results = document.getElementById ('result');
    var url = 'https://info2180-lab7-s-graham.c9users.io/world.php?country=';
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
        
        httpRequest.open ('GET', url + encodeURIComponent(search));
        httpRequest.send ();
    }
    
    function displayInfo ()
    {
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