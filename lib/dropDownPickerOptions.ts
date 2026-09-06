interface DropDownPickerOptionsEntry {
    de: { label: string, value: string }[],
    en: { label: string, value: string }[],
    fr: { label: string, value: string }[],
    it: { label: string, value: string }[],
    ch: { label: string, value: string }[],
}

export interface DropDownPickerOptions {
    de_wbkColor: DropDownPickerOptionsEntry
    ch_permitTypes: DropDownPickerOptionsEntry
}

export const dropDownPickerOptions: DropDownPickerOptions = {
    de_wbkColor: {
        de: [
            { label: '🟩 Grün', value: 'green' },
            { label: '🟨 Gelb', value: 'yellow' },
            { label: '🟥 Rot', value: 'red' },
        ],
        en: [
            { label: '🟩 Green', value: 'green' },
            { label: '🟨 Yellow', value: 'yellow' },
            { label: '🟥 Red', value: 'red' },
        ],
        fr: [
            { label: '🟩 Vert', value: 'green' },
            { label: '🟨 Jaune', value: 'yellow' },
            { label: '🟥 Rouge', value: 'red' },
        ],
        it: [
            { label: '🟩 Verde', value: 'green' },
            { label: '🟨 Giallo', value: 'yellow' },
            { label: '🟥 Rosso', value: 'red' },
        ],
        ch: [
            { label: '🟩 Verd', value: 'green' },
            { label: '🟨 Mellen', value: 'yellow' },
            { label: '🟥 Cotschen', value: 'red' },
        ],
    },
    ch_permitTypes: {
        de: [
            { label: 'Vertrag', value: 'contract' },
            { label: 'WES - Waffenerwerbsschein', value: 'wes' },
            { label: 'ABK Sport - Ausnahmebewilligung klein', value: 'abk1' },
            { label: 'ABK Sammler - Ausnahmebewilligung klein', value: 'abk2' },
            { label: 'SON - Sonderbewilligung', value: 'son' },
        ],
        en: [
            { label: 'Contract', value: 'contract' },
            { label: 'WAP - Weapons Acquisition Permit', value: 'wes' },
            { label: 'EP Sport - Small Exceptional Permit for Sport Shooting', value: 'abk1' },
            { label: 'EP Collector - Small Exceptional Permit for Collectors', value: 'abk2' },
            { label: 'EP - Exceptional Permit', value: 'son' },
        ],
        fr: [
            { label: 'Contrat', value: 'contract' },
            { label: 'PAA - Permis d’acquisition d’armes', value: 'wes' },
            { label: 'PAE Sport - Autorisation exceptionnelle pour tireur sportif', value: 'abk1' },
            { label: 'PAE Collectionneur - Autorisation exceptionnelle pour collectionneur', value: 'abk2' },
            { label: 'PAE - Autorisation exceptionnelle', value: 'son' },
        ],
        it: [
            { label: 'Contratto', value: 'contract' },
            { label: 'PAA - Permesso d’acquisto di armi', value: 'wes' },
            { label: 'AE Sportivo - Permesso di esenzione per il tiro sportivo', value: 'abk1' },
            { label: 'AE Collezionista - Autorizzazione cantonale eccezionale per motivi di collezionismo', value: 'abk2' },
            { label: 'AE - Autorizzazione d’eccezione', value: 'son' },
        ],
        ch: [
            { label: 'Contract', value: 'contract' },
            { label: 'PAA - Permissiun d’acquistar armas', value: 'wes' },
            { label: 'PCE Sport - Permissiun chantunala excepziunala Tir da sport', value: 'abk1' },
            { label: 'PCE Collecziun - Permissiun chantunala excepziunala Collecziunaders', value: 'abk2' },
            { label: 'PCE - Permissiun chantunala excepziunala', value: 'son' },
        ],
    }
}