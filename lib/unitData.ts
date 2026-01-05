import { Languages } from "interfaces";

interface Currency{
    isoCode: string
    flag: string
    name: string
}

export const currencies:Currency[] = [
    { isoCode: "CHF", flag: "🇨🇭", name: "Swiss Franc" },
    { isoCode: "EUR", flag: "🇪🇺", name: "Euro" },
    { isoCode: "USD", flag: "🇺🇸", name: "United States Dollar" },

    { isoCode: "AED", flag: "🇦🇪", name: "United Arab Emirates Dirham" },
    { isoCode: "AFN", flag: "🇦🇫", name: "Afghan Afghani" },
    { isoCode: "ALL", flag: "🇦🇱", name: "Albanian Lek" },
    { isoCode: "AMD", flag: "🇦🇲", name: "Armenian Dram" },
    { isoCode: "AOA", flag: "🇦🇴", name: "Angolan Kwanza" },
    { isoCode: "ARS", flag: "🇦🇷", name: "Argentine Peso" },
    { isoCode: "AUD", flag: "🇦🇺", name: "Australian Dollar" },
    { isoCode: "AWG", flag: "🇦🇼", name: "Aruban Florin" },
    { isoCode: "AZN", flag: "🇦🇿", name: "Azerbaijani Manat" },

    { isoCode: "BAM", flag: "🇧🇦", name: "Bosnia and Herzegovina Convertible Mark" },
    { isoCode: "BBD", flag: "🇧🇧", name: "Barbados Dollar" },
    { isoCode: "BDT", flag: "🇧🇩", name: "Bangladeshi Taka" },
    { isoCode: "BGN", flag: "🇧🇬", name: "Bulgarian Lev" },
    { isoCode: "BHD", flag: "🇧🇭", name: "Bahraini Dinar" },
    { isoCode: "BIF", flag: "🇧🇮", name: "Burundian Franc" },
    { isoCode: "BMD", flag: "🇧🇲", name: "Bermudian Dollar" },
    { isoCode: "BND", flag: "🇧🇳", name: "Brunei Dollar" },
    { isoCode: "BOB", flag: "🇧🇴", name: "Boliviano" },
    { isoCode: "BRL", flag: "🇧🇷", name: "Brazilian Real" },
    { isoCode: "BSD", flag: "🇧🇸", name: "Bahamian Dollar" },
    { isoCode: "BTN", flag: "🇧🇹", name: "Bhutanese Ngultrum" },
    { isoCode: "BWP", flag: "🇧🇼", name: "Botswana Pula" },
    { isoCode: "BYN", flag: "🇧🇾", name: "Belarusian Ruble" },
    { isoCode: "BZD", flag: "🇧🇿", name: "Belize Dollar" },

    { isoCode: "CAD", flag: "🇨🇦", name: "Canadian Dollar" },
    { isoCode: "CDF", flag: "🇨🇩", name: "Congolese Franc" },
    { isoCode: "CLF", flag: "", name: "Unidad de Fomento" },
    { isoCode: "CLP", flag: "🇨🇱", name: "Chilean Peso" },
    { isoCode: "CNY", flag: "🇨🇳", name: "Chinese Yuan" },
    { isoCode: "COP", flag: "🇨🇴", name: "Colombian Peso" },
    { isoCode: "CRC", flag: "🇨🇷", name: "Costa Rican Colón" },
    { isoCode: "CUP", flag: "🇨🇺", name: "Cuban Peso" },
    { isoCode: "CVE", flag: "🇨🇻", name: "Cape Verde Escudo" },
    { isoCode: "CZK", flag: "🇨🇿", name: "Czech Koruna" },

    { isoCode: "DJF", flag: "🇩🇯", name: "Djiboutian Franc" },
    { isoCode: "DKK", flag: "🇩🇰", name: "Danish Krone" },
    { isoCode: "DOP", flag: "🇩🇴", name: "Dominican Peso" },
    { isoCode: "DZD", flag: "🇩🇿", name: "Algerian Dinar" },

    { isoCode: "EGP", flag: "🇪🇬", name: "Egyptian Pound" },
    { isoCode: "ERN", flag: "🇪🇷", name: "Eritrean Nakfa" },
    { isoCode: "ETB", flag: "🇪🇹", name: "Ethiopian Birr" },

    { isoCode: "FJD", flag: "🇫🇯", name: "Fiji Dollar" },
    { isoCode: "FKP", flag: "🇫🇰", name: "Falkland Islands Pound" },

    { isoCode: "GBP", flag: "🇬🇧", name: "Pound Sterling" },
    { isoCode: "GEL", flag: "🇬🇪", name: "Georgian Lari" },
    { isoCode: "GHS", flag: "🇬🇭", name: "Ghanaian Cedi" },
    { isoCode: "GIP", flag: "🇬🇮", name: "Gibraltar Pound" },
    { isoCode: "GMD", flag: "🇬🇲", name: "Gambian Dalasi" },
    { isoCode: "GNF", flag: "🇬🇳", name: "Guinean Franc" },
    { isoCode: "GTQ", flag: "🇬🇹", name: "Guatemalan Quetzal" },
    { isoCode: "GYD", flag: "🇬🇾", name: "Guyanese Dollar" },

    { isoCode: "HKD", flag: "🇭🇰", name: "Hong Kong Dollar" },
    { isoCode: "HNL", flag: "🇭🇳", name: "Honduran Lempira" },
    { isoCode: "HRK", flag: "🇭🇷", name: "Croatian Kuna" },
    { isoCode: "HTG", flag: "🇭🇹", name: "Haitian Gourde" },
    { isoCode: "HUF", flag: "🇭🇺", name: "Hungarian Forint" },

    { isoCode: "IDR", flag: "🇮🇩", name: "Indonesian Rupiah" },
    { isoCode: "ILS", flag: "🇮🇱", name: "Israeli New Shekel" },
    { isoCode: "INR", flag: "🇮🇳", name: "Indian Rupee" },
    { isoCode: "IQD", flag: "🇮🇶", name: "Iraqi Dinar" },
    { isoCode: "IRR", flag: "🇮🇷", name: "Iranian Rial" },
    { isoCode: "ISK", flag: "🇮🇸", name: "Iceland Krona" },

    { isoCode: "JMD", flag: "🇯🇲", name: "Jamaican Dollar" },
    { isoCode: "JPY", flag: "🇯🇵", name: "Japanese Yen" },

    { isoCode: "KES", flag: "🇰🇪", name: "Kenyan Shilling" },
    { isoCode: "KGS", flag: "🇰🇬", name: "Kyrgyzstani Som" },
    { isoCode: "KHR", flag: "🇰🇭", name: "Cambodian Riel" },
    { isoCode: "KMF", flag: "🇰🇲", name: "Comorian Franc" },
    { isoCode: "KRW", flag: "🇰🇷", name: "South Korean Won" },
    { isoCode: "KWD", flag: "🇰🇼", name: "Kuwaiti Dinar" },
    { isoCode: "KZT", flag: "🇰🇿", name: "Kazakhstani Tenge" },

    { isoCode: "LAK", flag: "🇱🇦", name: "Lao Kip" },
    { isoCode: "LBP", flag: "🇱🇧", name: "Lebanese Pound" },
    { isoCode: "LKR", flag: "🇱🇰", name: "Sri Lankan Rupee" },
    { isoCode: "LRD", flag: "🇱🇷", name: "Liberian Dollar" },
    { isoCode: "LSL", flag: "🇱🇸", name: "Lesotho Loti" },

    { isoCode: "MAD", flag: "🇲🇦", name: "Moroccan Dirham" },
    { isoCode: "MDL", flag: "🇲🇩", name: "Moldovan Leu" },
    { isoCode: "MGA", flag: "🇲🇬", name: "Malagasy Ariary" },
    { isoCode: "MKD", flag: "🇲🇰", name: "Macedonian Denar" },
    { isoCode: "MMK", flag: "🇲🇲", name: "Myanmar Kyat" },
    { isoCode: "MNT", flag: "🇲🇳", name: "Mongolian Tögrög" },
    { isoCode: "MOP", flag: "🇲🇴", name: "Macanese Pataca" },
    { isoCode: "MRU", flag: "🇲🇷", name: "Mauritanian Ouguiya" },
    { isoCode: "MUR", flag: "🇲🇺", name: "Mauritius Rupee" },
    { isoCode: "MVR", flag: "🇲🇻", name: "Maldivian Rufiyaa" },
    { isoCode: "MWK", flag: "🇲🇼", name: "Malawian Kwacha" },
    { isoCode: "MXN", flag: "🇲🇽", name: "Mexican Peso" },
    { isoCode: "MYR", flag: "🇲🇾", name: "Malaysian Ringgit" },
    { isoCode: "MZN", flag: "🇲🇿", name: "Mozambican Metical" },

    { isoCode: "NAD", flag: "🇳🇦", name: "Namibian Dollar" },
    { isoCode: "NGN", flag: "🇳🇬", name: "Nigerian Naira" },
    { isoCode: "NIO", flag: "🇳🇮", name: "Nicaraguan Córdoba" },
    { isoCode: "NOK", flag: "🇳🇴", name: "Norwegian Krone" },
    { isoCode: "NPR", flag: "🇳🇵", name: "Nepalese Rupee" },
    { isoCode: "NZD", flag: "🇳🇿", name: "New Zealand Dollar" },

    { isoCode: "OMR", flag: "🇴🇲", name: "Omani Rial" },

    { isoCode: "PAB", flag: "🇵🇦", name: "Panamanian Balboa" },
    { isoCode: "PEN", flag: "🇵🇪", name: "Peruvian Sol" },
    { isoCode: "PGK", flag: "🇵🇬", name: "Papua New Guinea Kina" },
    { isoCode: "PHP", flag: "🇵🇭", name: "Philippine Peso" },
    { isoCode: "PKR", flag: "🇵🇰", name: "Pakistani Rupee" },
    { isoCode: "PLN", flag: "🇵🇱", name: "Polish Złoty" },
    { isoCode: "PYG", flag: "🇵🇾", name: "Paraguayan Guaraní" },

    { isoCode: "QAR", flag: "🇶🇦", name: "Qatari Rial" },

    { isoCode: "RON", flag: "🇷🇴", name: "Romanian Leu" },
    { isoCode: "RSD", flag: "🇷🇸", name: "Serbian Dinar" },
    { isoCode: "RUB", flag: "🇷🇺", name: "Russian Ruble" },
    { isoCode: "RWF", flag: "🇷🇼", name: "Rwandan Franc" },

    { isoCode: "SAR", flag: "🇸🇦", name: "Saudi Riyal" },
    { isoCode: "SBD", flag: "🇸🇧", name: "Solomon Islands Dollar" },
    { isoCode: "SCR", flag: "🇸🇨", name: "Seychelles Rupee" },
    { isoCode: "SDG", flag: "🇸🇩", name: "Sudanese Pound" },
    { isoCode: "SEK", flag: "🇸🇪", name: "Swedish Krona" },
    { isoCode: "SGD", flag: "🇸🇬", name: "Singapore Dollar" },
    { isoCode: "SHP", flag: "🇸🇭", name: "Saint Helena Pound" },
    { isoCode: "SLL", flag: "🇸🇱", name: "Sierra Leone Leone" },
    { isoCode: "SOS", flag: "🇸🇴", name: "Somali Shilling" },
    { isoCode: "SRD", flag: "🇸🇷", name: "Surinamese Dollar" },
    { isoCode: "SSP", flag: "🇸🇸", name: "South Sudanese Pound" },
    { isoCode: "STN", flag: "🇸🇹", name: "São Tomé and Príncipe Dobra" },
    { isoCode: "SYP", flag: "🇸🇾", name: "Syrian Pound" },
    { isoCode: "SZL", flag: "🇸🇿", name: "Swazi Lilangeni" },

    { isoCode: "THB", flag: "🇹🇭", name: "Thai Baht" },
    { isoCode: "TJS", flag: "🇹🇯", name: "Tajikistani Somoni" },
    { isoCode: "TMT", flag: "🇹🇲", name: "Turkmenistan Manat" },
    { isoCode: "TND", flag: "🇹🇳", name: "Tunisian Dinar" },
    { isoCode: "TOP", flag: "🇹🇴", name: "Tongan Paʻanga" },
    { isoCode: "TRY", flag: "🇹🇷", name: "Turkish Lira" },
    { isoCode: "TTD", flag: "🇹🇹", name: "Trinidad and Tobago Dollar" },
    { isoCode: "TWD", flag: "🇹🇼", name: "New Taiwan Dollar" },
    { isoCode: "TZS", flag: "🇹🇿", name: "Tanzanian Shilling" },

    { isoCode: "UAH", flag: "🇺🇦", name: "Ukrainian Hryvnia" },
    { isoCode: "UGX", flag: "🇺🇬", name: "Ugandan Shilling" },
    { isoCode: "UYU", flag: "🇺🇾", name: "Uruguayan Peso" },
    { isoCode: "UZS", flag: "🇺🇿", name: "Uzbekistani Som" },

    { isoCode: "VES", flag: "🇻🇪", name: "Venezuelan Bolívar Soberano" },
    { isoCode: "VND", flag: "🇻🇳", name: "Vietnamese Đồng" },
    { isoCode: "VUV", flag: "🇻🇺", name: "Vanuatu Vatu" },

    { isoCode: "WST", flag: "🇼🇸", name: "Samoan Tala" },

    { isoCode: "XAF", flag: "", name: "CFA Franc BEAC" },
    { isoCode: "XCD", flag: "", name: "East Caribbean Dollar" },
    { isoCode: "XDR", flag: "", name: "Special Drawing Rights" },
    { isoCode: "XOF", flag: "", name: "CFA Franc BCEAO" },
    { isoCode: "XPF", flag: "", name: "CFP Franc" }
];

interface WeightUnit{
    name: string
    de: string
    en: string
    fr: string
    it: string
    ch: string
    iso: string
    base: number
}

// weights all have their relation to grams. All weight data is stored in grams and displayed according to the chosen unit
export const weightUnits:WeightUnit[] = [
    {
        name: "pound", 
        iso: "lb", 
        base: 453.592,
        de: "Pfund",
        en: "Pound",
        fr: "Livre",          
        it: "Libbra",          
        ch: "Lira"            
    },
    {
        name: "grain", 
        iso: "gr", 
        base: 0.0647989,
        de: "Grain",
        en: "Grain",
        fr: "Grain",           
        it: "Grano",           
        ch: "Grain"            
    },
    {
        name: "gram", 
        iso: "g",
        base: 1,
        de: "Gramm",
        en: "Gram",
        fr: "Gramme",         
        it: "Grammo",        
        ch: "Gram"             
    },
    {
        name: "kilogram", 
        iso: "kg", 
        base: 1000,
        de: "Kilogram",
        en: "Kilogram",
        fr: "Kilogramme",      
        it: "Chilogrammo",     
        ch: "Chilogram"      
    }
]

interface DistUnit{
    name: string
    de: string
    en: string
    fr: string
    it: string
    ch: string
    iso: string
    base: number
}
// weights all have their relation to milimeter. All weight data is stored in milimeters and displayed according to the chosen unit
export const distUnits:DistUnit[] = [
    {
        name: "millimeter", 
        de: "Millimeter",
        en: "Millimetre",
        fr: "Millimètre",     
        it: "Millimetro",   
        ch: "Millimeter",   
        iso: "mm", 
        base: 1
    },
    {
        name: "centimeter", 
        de: "Zentimeter",
        en: "Centimetre",
        fr: "Centimètre",      
        it: "Centimetro",      
        ch: "Centimeter",      
        iso: "cm", 
        base: 10
    },
    {
        name: "inch", 
        de: "Zoll/Inch",
        en: "Inch",
        fr: "Pouce",           
        it: "Pollice",         
        ch: "Tschop",         
        iso: "in", 
        base: 25.4
    },
]
