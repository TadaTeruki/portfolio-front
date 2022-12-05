import { sha256 } from 'js-sha256'

const ConvertToSha256 = (str: string) => {
    var hash = sha256.create()
    hash.update(str)
    return hash.hex()
}

export default ConvertToSha256
