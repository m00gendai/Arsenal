import { getCaliberCount } from "../../../lib/caliberData"
import type { SimpleTranslation, SimpleTranslation_StringArray } from "../types/types_global"

export interface FAQ_Section{
    title: SimpleTranslation
    content: FAQ_QuestionAnswer[]
}

export interface FAQ_QuestionAnswer{
    question: SimpleTranslation
    answer: SimpleTranslation
}

export const title: SimpleTranslation ={
    de: "FAQ",
    en: "FAQ",
    fr: "FAQ",
    it: "FAQ"
}

export const faq: FAQ_Section[] = [
/* #################### Data Privacy and Security #################### */
    {
        title: {
            de: ``,
            en: `Data Privacy and Security`,
            fr: ``,
            it: ``
        },
        content: [
            {
                question: {
                    de: ``,
                    en: `Does Arsenal require an account?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
No, Arsenal has no user accounts, login or registration.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Where is the data saved and who has access to it?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Your collection database is stored locally on your device and only you have access to it.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Is my data encrypted?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Yes.
Arsenal uses SQLCipher, an open-source database encryption library, to encrypt your data with AES-256. 
The encryption key is generated on your device and stored in the iOS Keychain or Android Keystore — it never leaves your device.

`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `What happens if I get a decryption error / my data suddenly becomes unreadable?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Decryption failures are extremely rare and usually indicate corruption of the encryption key or secure storage. 
Unfortunately, without the encryption key the database cannot be recovered. Regular backups are therefore strongly recommended.

`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `What permissions does Arsenal need, and why?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Arsenal needs permissions:
- to access your file system
  This is to import and export your database and to select images from your gallery
- to access your camera
  This is to take photos of your collection items directly from within the app and to scan QR Codes

`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Does Arsenal collect analytics?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
No, Arsenal itself does not collect analytics, telemetry, usage statistics or collection data, nor does it transmit your collection to the developer.

Please note that Google Play and the Apple App Store may collect their own diagnostic, purchase or download information according to their respective privacy policies. 
This is outside Arsenal's control and does not include any application data.

`,
                    fr: `

`,
                    it: `

`,
                },
            },
        ]
    },
/* #################### Legal #################### */
    {
        title: {
            de: ``,
            en: `Legal`,
            fr: ``,
            it: ``
        },
        content: [
            {
                question: {
                    de: ``,
                    en: `Does using Arsenal fulfill or replace any legal record-keeping obligations?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Arsenal does not replace any official documents, nor is it accredited to function as a legal alternative for existing documents or legal frameworks.
It is a personal tool to track your firearm and related collections for personal use.
It does, however, provide the possibility to generate collection reports, for example gun lists, which can be tailored for specific requirements - eg for insurance companies or government agencies
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Does Arsenal report anything to police or other weapons authorities?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
No. 
Your collection data stays private, on your device, and only you have access to it.
The developer has no access to your collection because it never leaves your device.

`,
                    fr: `

`,
                    it: `

`,
                },
            },
        ]
    },
/* #################### Data Backup, Synchronization & Portability #################### */
    {
        title: {
            de: ``,
            en: `Data Backup, Synchronization & Portability`,
            fr: ``,
            it: ``
        },
        content: [
            {
                question: {
                    de: ``,
                    en: `What happens if I lose or replace my phone — can I restore my collection?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
The privacy focus and subsequent avoidance of any network connectivity whatsoever comes with the caveat that there is no cloud backup or server synchronization.
It is your responsibility to back up your database regularly. You can do so via the various export options.

If you replace your phone, simply export the database from your old phone and import it in the new phone.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Can I import data from Excel or a competitor app?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Yes, your own Excel files (in CSV format) can be imported. The handling of the fields can be configured directly in the app.

Please note that the calibers must be named exactly as specified in the app, otherwise the "QuickShot" function will not work. A list of calibers can be found here. Multiple calibers are separated by a comma followed by a space ", ".

Please also note that importing as a CSV file does not support images, these must be added in the app.

`,
                    fr: `

`,
                    it: `

`,
                },
            },
        ]
    },
/* #################### Pricing & Access #################### */
    {
        title: {
            de: ``,
            en: `Pricing & Access`,
            fr: ``,
            it: ``
        },
        content: [
            {
                question: {
                    de: ``,
                    en: `Is Arsenal a one-time purchase or a subscription?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Arsenal is strictly a one-time purchase. Buy once, use forever, including any future updates.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `What happens to my data if I delete the app or app data?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Deleting (uninstalling) the app deletes the database as well, so your data is lost if you did not back it up.
The same applies when deleting app data via the phone settings.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Is there a free trial or demo version?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
No, Arsenal currently doesn't offer a trial version. 
Since the app is a one-time purchase, both Google Play and the Apple App Store offer refund options if the app doesn't meet your expectations.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
        ]
    },
/* #################### Practical Use #################### */
    {
        title: {
            de: ``,
            en: `Practical Use`,
            fr: ``,
            it: ``
        },
        content: [
            {
                question: {
                    de: ``,
                    en: `Which platforms are supported?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Arsenal is available for both Android and iOS.
It requires Android 7.0 or newer, and iOS 15.5 or newer respectively.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Does Arsenal work offline?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Arsenal has been built with strict offline operation in mind and does not require any internet connection to function.

The About section contains links to external resources that require an internet connection to display. 
All collection management features continue to work fully offline.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Can I use Arsenal on multiple devices?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Yes.
Export your database from one device and import it on another.
Arsenal intentionally does not synchronize devices automatically because it does not use cloud services.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Can I use the PDF exports for insurance documentation or a police-requested inventory list?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Yes.
Arsenal features a flexible PDF export generation with predefined and customizable exports tailored to your specific needs.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Can I create custom attributes beyond what's built in?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
No, the attributes are fixed and not extensible.
This is to avoid any conflicts with future updates.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Can I define custom calibers when they're not in the built-in list?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
No, the calibers are fixed and not extensible.
This is to avoid any conflicts with future updates and to keep the QuickShot/QuickStock functionality in sync - QuickShot/QuickStock depend on the correct caliber format.

If a caliber is missing, you can request it by sending a message to the developer. It will then be added in the next update.

You can bypass this restriction by importing a CSV where the caliber entries are not validated. 
However, this is not recommended and can lead to unexpected behavior.
Backup the database before trying this!
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `What happens to my collection if I sell a firearm to someone else — is there a transfer/handoff record?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Yes.
Sales can be recorded with sell date, sell price, buyer permit reference and any personal remarks.
Sold items remain in the database unless explicitly deleted but can be hidden via settings.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `What languages does the app support?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
The app currently supports English, German, French, Italian and Rumantsch Grischun.
Changing language is seamless and can be done at any time.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
        ]
    },
/* #################### General #################### */
    {
        title: {
            de: ``,
            en: `General`,
            fr: ``,
            it: ``
        },
        content: [
            {
                question: {
                    de: ``,
                    en: `I already use a competitor app, why should I switch to Arsenal?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
There are indeed several alternative apps, especially on Android, that serve the same purpose as Arsenal. However:
- most are US-oriented
- they seem to have no language selection or employ an auto-translation
- they do not seem to have the same range of functions, or if they do, they seem quite unintuitive and cumbersome
- the developer can sometimes be difficult to identify or contact (LLC in front of the developer) and sometimes appear to not interact with the community
- they can cost twice as much, may have partly non-transparent in-app purchases or advertising or can offer subscription based payment models
- some seem to not be in active development

Arsenal, on the other hand:
- is primarily tailored to Swiss needs, but also usable worldwide and offers a choice in displayed units of measurement, for example
- is available in five languages, with translations into German and English made by hand, and French, Italian and Rumantsch Grischun by using a Swiss Translation Service
- has a modern, simple (as much as possible) and functional user interface
- has a private Swiss developer who is actively known in the Swiss weapons and shooting community and interacts with that community
- costs a one-time fee of 5 CHF for life, including all future updates. No ads, no subscriptions, no in-app purchases.
- is in constant development

Ultimately, everyone decides for themselves which app, if any, is best suited. Sometimes that Excel-Sheet is sufficient.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
        ]
    },
/* #################### Support #################### */
    {
        title: {
            de: ``,
            en: `Support`,
            fr: ``,
            it: ``
        },
        content: [
            {
                question: {
                    de: ``,
                    en: `Can I see the development progress of the app?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Yes, the current development status, including planned and requested features, is published on [Trello (English only)](https://trello.com/b/aewI0VKW/arsenal).
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Where can I voice my feedback, critique and wishes?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Official Thread on [waffenforum.ch](https://waffenforum.ch/forum/index.php?thread/2883-arsenal-die-schweizer-app-f%C3%BCr-waffensammler/&pageNo=1)
Via Email to info@mrweber.ch
`,
                    fr: `

`,
                    it: `

`,
                },
            },
        ]
    },
/* #################### AI #################### */
    {
        title: {
            de: ``,
            en: `AI - Artificial Intelligence`,
            fr: ``,
            it: ``
        },
        content: [
            {
                question: {
                    de: ``,
                    en: `Does Arsenal send my data to AI services?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
No, Arsenal does not send your data anywhere, it remains strictly on your device.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Does Arsenal have AI functionality?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Arsenal does not rely on cloud-based AI services or generative AI.
Currently, Arsenal includes on-device QR code recognition, which processes data entirely on your device and does not transmit anything to external services.
Any future intelligent features, such as OCR, will likewise be designed to run entirely on your device without transmitting your data.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Was AI used during development? If so, in what capacity?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Yes.
AI is used as a development aid in much the same way as documentation, technical books or specialized forums.
Arsenal is not generated by AI. The developer has extensive experience with JavaScript, TypeScript and React predating modern AI tools. 
Every AI-generated suggestion is critically reviewed, tested and manually adapted before being incorporated into the app.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
            {
                question: {
                    de: ``,
                    en: `Why doesn't Arsenal rely on cloud-based AI?`,
                    fr: ``,
                    it: ``
                },
                answer: {
                    de: `

`,
                    en: `
Arsenal is designed around privacy, offline operation and long-term reliability. Cloud-based AI services generally require transmitting data to external providers and incur ongoing operating costs.

To remain fully functional offline, independent of third-party AI providers and available as a one-time purchase without subscriptions or recurring fees, Arsenal intentionally does not rely on cloud-based AI services.

On-device technologies, such as QR code recognition and potentially future OCR, are compatible with this philosophy because they process data entirely on your device.
`,
                    fr: `

`,
                    it: `

`,
                },
            },
        ]
    },
]