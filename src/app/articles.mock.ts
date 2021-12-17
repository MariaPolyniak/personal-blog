import { ArticleModel } from "./models/article.model";

export const ARTICLES: ArticleModel[] = [
  {
    "id": 0,
    "author": "Gerard Sans",
    "date": 1638272789226,
    "title": "Angular: tips and tricks for CSS structure",
    "content": "In a precedent article, I wrote about /deep/ to structure CSS in a hierarchical way. But now /deep/ is deprecated, replaced by :ng-deep… There are other ways to have a good CSS structure. I assume in this article that you use the Angular CLI to build your project and use SCSS (or other preprocessing CSS like LESS). Why having a good CSS architecture inside our Angular app? When building our application, I saw that some people use only global style without using the component style isolation, or rewrite again and again properties… However, going this way can be difficult in the future and also less efficient. If you are interested in PWA and did some tests, you can lead render-blocking stylesheet, so poor performance in low network or low-end devices. DRY in your files! Reuse properties inside your application and other projects!",
    "likesAmount": 0,
    "tagList": ["angular", "css", "tips"]
  },
  {
    "id": 1,
    "author": "Gerard Sans",
    "date": 1638272789227,
    "title": "Angular — Advanced Styling Guide",
    "content": "Styling Angular Applications has never been more flexible. Angular Component Architecture offers a new styling model that isolates Component styles by using Shadow DOM (emulated or native) a technology from Web Components specification. Styles are scoped for each Component so they can’t affect other areas of the UI. For this post we are going to use a Component to render song tracks showing some of the different styling options. This component will render the cover, title and artist for a song. Angular Encapsulations Modes. Let’s quickly review all available encapsulation modes before further exploring the different styling approaches. Emulated (default) When using this mode Angular will identify each component using two unique attributes: _nghost-* and _ngcontent-*. Any component styles will be added to the head using these attributes to isolate the styles as in the example below.",
    "likesAmount": 10,
    "tagList": ["angular", "guide", "styles", "css"]
  },
  {
    "id": 2,
    "author": "Gerard Sans",
    "date": 1638272789228,
    "title": "All About Angular Material",
    "content": "UI libraries are nowadays essential for every web application. First, because it accelerates development and keeps all developers constraint to use the same component for the same purpose, thus more reusability in the application and less maintenance effort. Second, it makes new front-end developers in a team comfortable and start super-fast producing since the source or the guideline to follow is one and already specified: Prime NG. In this article, I’m answering questions about the Angular Material UI library such as what is it? Why using it? How and when to use it? In the end, I’m giving some final thoughts from my experience and my opinion as a front-end developer. Ready? leeeet’s gooo What’s Angular Material? Angular Material is a UI component library for Angular applications. It provides modern UI components that work on desktop as well as mobile devices. You can build with these UI modern components attractive, consistent, and functional web applications.",
    "likesAmount": 10,
    "tagList": ["angular", "styles", "angular material"]
  }
]