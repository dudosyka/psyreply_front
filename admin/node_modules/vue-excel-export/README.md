# JSON to Excel for VUE 2

Download your JSON data as an excel file directly from the browser. This component it's based on the solution proposed on this thread https://stackoverflow.com/questions/17142427/javascript-to-export-html-table-to-excel

### Important! Extra prompt in Microsoft Excel

**The method implemented in this component use HTML tables to draw the .xls files, Microsoft Excel no longer recognize HTML as native content so will prompt a warning message before open the file. The content will be rendered perfectly but the message can't be avoid.**


## Getting started

Get the package:
```bash
npm install vue-excel-export
```

Register excel in your app entrypoint:
```js
import Vue from 'vue'
import excel from 'vue-excel-export'

Vue.use(excel)
```

In your template
```html
<export-excel
    :data   = "json_data">
    Download Data
    <img src="download_icon.png">
</export-excel>
```

## Props List

| Name             | Type  | Description |
| :---             | :---: | ---         |
| data  | Array  | Data to be exported | 
| fields  | Object  | fields inside the Json Object that you want to export. If no given, all the properties in the Json  are exported | 
| export-fields (exportFields)    | Object | this prop is used to fix the problem with other components that use the variable fields, like vee-validate. exportFields works exactly like fields  |
| type    | string | mime type [xls, csv], default: xls |
| name    | string | filename to export, deault: data.xls |
| title    | string/Array | Title(s) for the data, could be a string or an array of strings (multiple titles) |
| footer    | string/Array | Footer(s) for the data, could be a string or an array of strings (multiple footers) |
| default-value (defaultValue)  | string | Use as fallback when the row has no field values, default: '' |
| worksheet | string | Name of the worksheet tab.  default: 'Sheet1' |
| fetch  | Function | Callback to fetch data before download, if it's set it runs immediately after mouse pressed and before download process. IMPORTANT: only works if no data prop is defined |
| before-generate  | Function | Callback to call a method right before the generate / fetch data, eg:show loading progress |
| before-finish  | Function | Callback to call a method right before the download box pops out, eg:hide loading progress |


## Example

```js
import Vue from 'vue'
import excel from 'vue-excel-export'

Vue.use(excel)

const app = new Vue({
    el: '#app',
    data: {
        json_fields: {
            'Complete name': 'name',
            'City': 'city',
            'Telephone': 'phone.mobile',
            'Telephone 2' : {
                field: 'phone.landline',
                callback: (value) => {
                    return `Landline Phone - ${value}`;
                }
            },
        },
        json_data: [
            {
                'name': 'Tony Peña',
                'city': 'New York',
                'country': 'United States',
                'birthdate': '1978-03-15',
                'phone': {
                    'mobile': '1-541-754-3010',
                    'landline': '(541) 754-3010'
                }
            },
            {
                'name': 'Thessaloniki',
                'city': 'Athens',
                'country': 'Greece',
                'birthdate': '1987-11-23',
                'phone': {
                    'mobile': '+1 855 275 5071',
                    'landline': '(2741) 2621-244'
                }
            }
        ],
        json_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ],
    }
})
```

In your HTML call it like

```html
<export-excel
	class   = "btn btn-default"
	:data   = "json_data"
	:fields = "json_fields"
	worksheet = "My Worksheet"
	name    = "filename.xls">

	Download Excel (you can customize this with html code!)

</export-excel>
```
REQUIRED
- json_data: Contains the data you want to export,
- json_fields: You can select what fields to export, especify nested data and assign labels to the fields
the key is the label, the value is the JSON field. This will export the field data 'as is'.
    If you need to customize the the exported data you can define a callback function. Thanks to @gucastiliao.
```js
let json_fields = {
    // regular field (exported data 'as is')
    fieldLabel: attributeName, // nested attribute supported
    // callback function for data formatting
    anotherFieldLabel: {
        field: anotherAttributeName, // nested attribute supported
        callback: (value) => {
            return `formatted value ${value}`
        }
    },
}
```

## Export CSV
To export JSON to CSV file just add the prop type with value "csv":

```html
<export-excel
	class   = "btn btn-default"
	:data   = "json_data"
	:fields = "json_fields"
	type    = "csv"
	name    = "filename.xls">

	Download Excel (you can customize this with html code!)

</export-excel>
```

## License
MIT



#### Status
This project is in an early stage of development. Any contribution is welcome :D
