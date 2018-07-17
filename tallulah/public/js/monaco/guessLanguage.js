function guessLang(filename) {
    var ext = filename.split('.')
    ext = ext[ext.length - 1]
    switch (ext) {
        case 'js':
            return 'javascript'
        case 'ts':
            return 'typescript'
        case 'cs':
            return 'csharp'
        case 'sql':
            return 'mysql'
        case 'md':
            return 'markdown'
        case 'txt':
            return 'plaintext'
        case 'm':
            return 'objective-c'
        case 'h':
            return 'cpp'
        default:
            return ext
    }
}