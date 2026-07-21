export class ImportCancelledError extends Error {
    constructor() {
        super("Import cancelled by user")
        this.name = "ImportCancelledError"
    }
}

export class ExportCancelledError extends Error {
    constructor() {
        super("Export cancelled by user")
        this.name = "ExportCancelledError"
    }
}

export class ImportDatabaseNoValidFileSelectedError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ImportDatabaseNoValidFileSelectedError"
    }
}

export class ImportDatabaseMimeTypeError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ImportDatabaseMimeTypeError"
    }
}

export class ImportDatabaseVersionMismatchError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ImportDatabaseVersionMismatchError"
    }
}

export class ImportDatabaseGenericFileError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ImportDatabaseGenericFileError"
    }
}