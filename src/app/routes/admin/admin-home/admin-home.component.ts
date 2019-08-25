import { Component, OnInit } from '@angular/core';
import { single, multi, pie, times } from './data';
import { TdDigitsPipe } from '@covalent/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  pie: any[];
  single: any[];
  multi: any[];
  times: any[];

  config = {
    "toolbox": {
      "showTitle": true,
      "top": 0,
      "right": "30px",
      "show": true,
      "feature": {
        "dataView": {
          "title": "View Data",
          "lang": [
            "Data View",
            "Turn Off",
            "Refresh"
          ]
        },
        "dataZoom": {
          "title": {
            "zoom": "Zoom",
            "back": "Back"
          }
        },
        "magicType": {
          "type": [
            "line",
            "bar",
            "stack",
            "tiled"
          ],
          "title": {
            "line": "Line",
            "bar": "Bar",
            "stack": "Stack",
            "tiled": "Tiled"
          }
        },
        "restore": {
          "title": "Restore"
        }
      }
    },
    "xAxis": [
      {
        "data": [
          "Electronics",
          "Toys",
          "Grocery",
          "Appliances",
          "Automotive",
          "Sports"
        ]
      },
      {
        "show": true,
        "type": "time",
        "boundaryGap": false
      }
    ],
    "yAxis": [
      {
        "show": true,
        "type": "value",
        "axisLabel": {
          "inside": false
        },
        "max": 300
      }
    ],
    "series": [
      {
        "type": "bar",
        "itemStyle": {
          "opacity": 0.95,
          "color": "#007373"
        },
        "markPoint": {
          "data": [
            {
              "name": "test",
              "value": 130,
              "xAxis": 1,
              "yAxis": 130
            }
          ]
        },
        "name": "Yesterday",
        "data": [
          150,
          130,
          150,
          120,
          150,
          120
        ]
      },
      {
        "type": "bar",
        "itemStyle": {
          "opacity": 0.95,
          "color": "#1B98C6"
        },
        "markPoint": {
          "data": [
            {
              "name": "Target",
              "value": 80,
              "xAxis": 1,
              "yAxis": 121
            }
          ]
        },
        "markLine": {
          "data": [
            {
              "name": "Average",
              "value": 30,
              "xAxis": 1,
              "yAxis": 30
            }
          ],
          "symbol": "circle"
        },
        "name": "Today",
        "data": [
          80,
          122,
          80,
          120,
          80,
          120
        ]
      }
    ],
    "tooltip": {
      "show": true,
      "trigger": "item",
      "showContent": true
    }
  };

  // Data table
  data: any[] = [
    {
      'name': 'Frozen yogurt',
      'type': 'Ice cream',
      'calories': 159.0,
      'fat': 6.0,
      'carbs': 24.0,
      'protein': 4.0,
    }, {
      'name': 'Ice cream sandwich',
      'type': 'Ice cream',
      'calories': 237.0,
      'fat': 9.0,
      'carbs': 37.0,
      'protein': 4.3,
    }, {
      'name': 'Eclair',
      'type': 'Pastry',
      'calories': 262.0,
      'fat': 16.0,
      'carbs': 24.0,
      'protein': 6.0,
    }, {
      'name': 'Cupcake',
      'type': 'Pastry',
      'calories': 305.0,
      'fat': 3.7,
      'carbs': 67.0,
      'protein': 4.3,
    }, {
      'name': 'Jelly bean',
      'type': 'Candy',
      'calories': 375.0,
      'fat': 0.0,
      'carbs': 94.0,
      'protein': 0.0,
    }, {
      'name': 'Lollipop',
      'type': 'Candy',
      'calories': 392.0,
      'fat': 0.2,
      'carbs': 98.0,
      'protein': 0.0,
    }, {
      'name': 'Honeycomb',
      'type': 'Other',
      'calories': 408.0,
      'fat': 3.2,
      'carbs': 87.0,
      'protein': 6.5,
    }, {
      'name': 'Donut',
      'type': 'Pastry',
      'calories': 452.0,
      'fat': 25.0,
      'carbs': 51.0,
      'protein': 4.9,
    }, {
      'name': 'KitKat',
      'type': 'Candy',
      'calories': 518.0,
      'fat': 26.0,
      'carbs': 65.0,
      'protein': 7.0,
    }, {
      'name': 'Chocolate',
      'type': 'Candy',
      'calories': 518.0,
      'fat': 26.0,
      'carbs': 65.0,
      'protein': 7.0,
    }, {
      'name': 'Chamoy',
      'type': 'Candy',
      'calories': 518.0,
      'fat': 26.0,
      'carbs': 65.0,
      'protein': 7.0,
    },
  ];

  constructor() { }

  ngOnInit() {
    Object.assign(this, { pie, single, multi, times });
  }

  // NGX Charts Axis
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }

  axisDate(val: string): string {
    return new DatePipe('es').transform(val, 'hh a');
  }

}
