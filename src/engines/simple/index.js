import jDoc from './../../core/jdoc/index';
import readerProps from './reader/props';

export default {
    name: 'Simple',
    formats: ['text/plain'],
    value: jDoc.Engine.extend(copy({
        options: {
            value: {
                parseMethod: "parseFromSimpleFile"
            }
        },
        fileTypeParsers: {
            value: [
                {
                    extension: ['txt'],
                    mime: ['text/plain'],
                    isTextDocument: true
                }
            ]
        }
    }, readerProps))
}