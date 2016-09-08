declare interface IHelloWorldLiveStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  favColorFieldLabel: string;
}

declare module 'helloWorldLiveStrings' {
  const strings: IHelloWorldLiveStrings;
  export = strings;
}
