import { verify } from 'crypto';
import fs from 'fs'
import fetch from 'node-fetch';
import https from 'https'
import xlsx from 'xlsx'



async function getFileRfgf(){
const httpsAgent =new https.Agent({rejectUnauthorized:false})
//const url ='https://rfgf.ru/catalog/temp_files/opendata/license/opendata.csv//'
const url = 'https://bi.rfgf.ru/corelogic/api/query'
const headers = {
  'authority': 'bi.rfgf.ru',
  'accept': 'application/json, text/javascript, */*; q=0.01',
  'accept-language': 'ru,en-US;q=0.9,en;q=0.8',
  'authorization': 'Bearer NoAuth',
  'content-type': 'application/json',
  'cookie': '_ym_uid=1691569716683077204; _ym_d=1691569716; _ym_isad=1',
  'origin': 'https://bi.rfgf.ru',
  'referer': 'https://bi.rfgf.ru/viewer/public?dashboardGuid=ae176f70a6df4e81ba10247f44fb1191&showNav=false&fit=false',
  'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Linux"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'x-requested-with': 'XMLHttpRequest'
}
const body = JSON.stringify({'QueryType': 'GetRawOlapData+Query',
'RawOlapSettings': {
  'databaseId': 'Main',
  'measureGroup': {
    'columns': [
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': 'c64a19c50c394605981e3ebe87918ae1',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'rcart_link'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '7c57c1b9e5b74322b5976eff809e3c20',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'lc_number_full'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': 'b146527321b840668975b16507194d33',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'has_doc'
      },
      {
        'type': 'RawOlapDimensionRoleAttributeColumnDto',
        'kind': 'RawOlapDimensionRoleAttributeColumnDto',
        'guid': '3766824573874611bc87322d41091f2f',
        'dimensionRoleId': {
          'type': 'DimensionRoleIdDto',
          'kind': 'DimensionRoleIdDto',
          'value': 'date_reg_start'
        },
        'attributeId': 'DATE'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': 'dd98c164c5234359b58909f9b96f10da',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'purpose'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '0c54fe57b031469686122724a10fca61',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'lc_cat_type_abr_with_pi'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '7514ae69824d42fb999a6630fc6b902d',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'area_nedr_name'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': 'f5cd97e6be364c82a48e8bad88682e32',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'region_name_sf'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '15dfc1c77ad34713acd832b0b28cba33',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'koord'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '89880068c9514a94b74dd1ac6326c4ee',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'stat_uch'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '55928c0365254e989776b22c2ad91133',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'company_name'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '30e8b6fcda754620b37a8808eaad9822',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'organ'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '1565bb98bd09479dbb14db2a63d04ad6',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'doc_lic'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '8b0d834417a14859940ba47a37420323',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'doc_dopoln'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '86006ff857ee48c0b94c27a5c82743e4',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'lc_number_full_new'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '24644a616cba4dcba8369c584ba1cfea',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'annul_doc'
      },
      {
        'type': 'RawOlapDimensionRoleAttributeColumnDto',
        'kind': 'RawOlapDimensionRoleAttributeColumnDto',
        'guid': '17bd7207b3b14433803e97480f5dc2a4',
        'dimensionRoleId': {
          'type': 'DimensionRoleIdDto',
          'kind': 'DimensionRoleIdDto',
          'value': 'annul_date'
        },
        'attributeId': 'DATE'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '930bb47ba3b242b2b91e81d457692a54',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'pause_dates'
      },
      {
        'type': 'RawOlapDimensionRoleAttributeColumnDto',
        'kind': 'RawOlapDimensionRoleAttributeColumnDto',
        'guid': 'a46c3241eeae4c5e9d81d71f84c03eab',
        'dimensionRoleId': {
          'type': 'DimensionRoleIdDto',
          'kind': 'DimensionRoleIdDto',
          'value': 'date_reg_end'
        },
        'attributeId': 'DATE'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': 'd02af800021e4f559a1120bae16e692f',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'num_rann_lic'
      },
      {
        'type': 'RawOlapDimensionAttributeColumnDto',
        'kind': 'RawOlapDimensionAttributeColumnDto',
        'guid': '1fb7dfc7907545899a8bf78dc7c655b2',
        'dimensionId': {
          'type': 'DimensionIdDto',
          'kind': 'DimensionIdDto',
          'value': 'R_litsenziya'
        },
        'attributeId': 'asln_link'
      }
    ],
    'filters': [
      [
        {
          'selectedFilterValues': [
            '\u0414\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442'
          ],
          'attributeId': 'STATUS_LIC',
          'dimensionOrDimensionRoleId': {
            'type': 'DimensionIdDto',
            'kind': 'DimensionIdDto',
            'value': 'R_litsenziya'
          },
          'useExcluding': false
        },
        {
          'selectedFilterValues': [
            '\u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440\u0441\u043A\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C'
          ],
          'attributeId': 'SUB_RF_licenz',
          'dimensionOrDimensionRoleId': {
            'type': 'DimensionIdDto',
            'kind': 'DimensionIdDto',
            'value': 'R_litsenziya'
          },
          'useExcluding': false
        }
      ]
    ],
    'times': [],
    'id': 'R_Reestr_litsenzii'
  },
  'lazyLoadOptions': {
    'columnSorts': [
      {
        'columnindex': 3,
        'order': 1
      }
    ],
    'offset': 0,
    'limit': 100
  }
},
'CalculationQueries': [],
'AdditionalLogs': {
  'widgetGuid': '245d52ef1fdc474a8795fc37a8d03d02',
  'dashboardGuid': 'ae176f70a6df4e81ba10247f44fb1191',
  'sheetGuid': '23760aa1c3844e9686946dfac2d0e8a0'
},
'WidgetGuid': '245d52ef1fdc474a8795fc37a8d03d02'
})

const method = 'POST'
const metod_respons = {
    "headers": headers,
    "body": body,
    "method": method,
    "agent": httpsAgent
  }
console.log('запускаю')
const response = await fetch(url,metod_respons)
console.log(response.status)
if (response.status==200){
  const body= await response.json()
  //console.log(body)
  //fs.writeFileSync('./rfgf.csv',body,(err)=>{console.log('Ошибка записи!', err)})
}

}

getFileRfgf()
