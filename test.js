function TwitterValidation(input)
{
        if (/\d/.test(input)) {
    
             console.log("Cannot contain numbers");
             return false;
        }
        if (/\s/.test(input)) {
            console.log("Cannot contain spaces");
            return false;
        }
        else
        {
        return 'true';
        }
}

