const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// User information (you can modify these as needed)
const USER_INFO = {
    fullName: "kalyanam_karthik",
    email: "kalyanam.karthik2022@vitstudent.ac.in",
    rollNumber: "22BEC1268"
};

// Helper function to generate user_id
function generateUserId() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${USER_INFO.fullName}_${day}${month}${year}`;
}

// Helper function to check if a string is a number
function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

// Helper function to check if a string is an alphabet
function isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
}

// Helper function to check if a string is a special character
function isSpecialCharacter(str) {
    return /^[^a-zA-Z0-9\s]+$/.test(str);
}

// Helper function to create alternating caps string in reverse order
function createAlternatingCapsString(alphabets) {
    if (alphabets.length === 0) return "";
    
    // Join all alphabets and reverse
    const joinedString = alphabets.join('').split('').reverse().join('');
    
    // Apply alternating caps
    let result = '';
    for (let i = 0; i < joinedString.length; i++) {
        if (i % 2 === 0) {
            result += joinedString[i].toUpperCase();
        } else {
            result += joinedString[i].toLowerCase();
        }
    }
    
    return result;
}

// Main API endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input. 'data' must be an array."
            });
        }

        // Initialize arrays for different data types
        const evenNumbers = [];
        const oddNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;

        // Process each element in the array
        data.forEach(item => {
            const str = String(item);
            
            if (isNumber(str)) {
                const num = parseInt(str);
                sum += num;
                
                if (num % 2 === 0) {
                    evenNumbers.push(str);
                } else {
                    oddNumbers.push(str);
                }
            } else if (isAlphabet(str)) {
                alphabets.push(str.toUpperCase());
            } else if (isSpecialCharacter(str)) {
                specialCharacters.push(str);
            }
        });

        // Create concatenated string with alternating caps in reverse order
        const concatString = createAlternatingCapsString(alphabets);

        // Prepare response
        const response = {
            is_success: true,
            user_id: generateUserId(),
            email: USER_INFO.email,
            roll_number: USER_INFO.rollNumber,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: String(sum),
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// Start server
app.listen(PORT, () => {});

module.exports = app;
