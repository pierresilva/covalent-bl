import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { TdMediaService } from '@covalent/core';
import { tdRotateAnimation } from '@covalent/core/common';
import { single, multi, pie, times } from './data';

@Component({
  selector: 'bl-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss'],
  animations: [
    tdRotateAnimation,
  ],
})
export class LayoutDefaultComponent implements OnInit, AfterViewInit {

  userLogued: boolean = false;

  @ViewChild('dialogContent', {read: true, static: false}) template: TemplateRef<any>;

  items: any[] = [
    {
      displayName: 'DevFestFL',
      iconName: 'recent_actors',
      route: 'devfestfl',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          route: 'devfestfl/speakers',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'devfestfl/speakers/michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/michael-prentice/material-design',
                },
              ],
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'devfestfl/speakers/stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/stephen-fluin/what-up-web',
                },
              ],
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'devfestfl/speakers/mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/mike-brocchi/my-ally-cli',
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/mike-brocchi/become-angular-tailer',
                },
              ],
            },
          ],
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          route: 'devfestfl/sessions',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/material-design',
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/what-up-web',
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/my-ally-cli',
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/become-angular-tailer',
            },
          ],
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'devfestfl/feedback',
        },
      ],
    },
    {
      displayName: 'Disney',
      iconName: 'videocam',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design',
                },
              ],
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web',
                },
              ],
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli',
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer',
                },
              ],
            },
          ],
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'material-design',
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'what-up-web',
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli',
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer',
            },
          ],
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback',
        },
      ],
    },
    {
      displayName: 'Orlando',
      iconName: 'movie_filter',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design',
                },
              ],
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web',
                },
              ],
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli',
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer',
                },
              ],
            },
          ],
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'material-design',
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'what-up-web',
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli',
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer',
            },
          ],
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback',
        },
      ],
    },
    {
      displayName: 'Maleficent',
      disabled: true,
      iconName: 'report_problem',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design',
                },
              ],
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web',
                },
              ],
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli',
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer',
                },
              ],
            },
          ],
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'material-design',
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'what-up-web',
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli',
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer',
            },
          ],
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback',
        },
      ],
    },
  ];

  // Dialog
  config = {
    width: '50%',
    height: '50%',
  };

  // Nav
  routes = [{
    title: 'Dashboards',
    route: '/',
    icon: 'dashboard',
  }, {
    title: 'Reports',
    route: '/',
    icon: 'insert_chart',
  }, {
    title: 'Sales',
    route: '/',
    icon: 'account_balance',
  }, {
    title: 'Marketplace',
    route: '/',
    icon: 'store',
  }];

  usermenu = [{
    title: 'Profile',
    route: '/',
    icon: 'account_box',
  }, {
    title: 'Settings',
    route: '/',
    icon: 'settings',
  }];

  constructor(
    public media: TdMediaService,
    public dialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
  ) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl
        ('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent.svg'));

    Object.assign(this, { pie, single, multi, times });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();
  }

  openTemplate(): void {
    this.dialog.open(this.template, this.config);
  }

}
