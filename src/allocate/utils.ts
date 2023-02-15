const highlight = require('cli-highlight').highlight
export const cc: any = console
cc["logjson"] = (obj: any) => console.log(
                               highlight( JSON.stringify(obj, null, 4),
                                          { language: 'json', ignoreIllegals: true } ));


export function syntaxHighlight(json: any) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match: any) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

export function oc(data: any): any {
    return new Proxy((function (defaultValue:any) { return (data == null ? defaultValue : data); }), {
        get: function (target: any, key) {
            var obj = target();
            return oc(typeof obj === 'object' ? obj[key] : undefined);
        },
    });
}

export function getId() {
    let count = 1;
    return function(): string {
        return "" + count++;
    }
}