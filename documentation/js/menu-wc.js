'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-f497fed3ed404229f788caa8b44a4cd545d786666e6ef57c1bc70479cc09666c2452449e9b39962dd9c098231e8a0c226ae2e8b4c572e019c0f4a9c788ce236b"' : 'data-bs-target="#xs-controllers-links-module-AppModule-f497fed3ed404229f788caa8b44a4cd545d786666e6ef57c1bc70479cc09666c2452449e9b39962dd9c098231e8a0c226ae2e8b4c572e019c0f4a9c788ce236b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-f497fed3ed404229f788caa8b44a4cd545d786666e6ef57c1bc70479cc09666c2452449e9b39962dd9c098231e8a0c226ae2e8b4c572e019c0f4a9c788ce236b"' :
                                            'id="xs-controllers-links-module-AppModule-f497fed3ed404229f788caa8b44a4cd545d786666e6ef57c1bc70479cc09666c2452449e9b39962dd9c098231e8a0c226ae2e8b4c572e019c0f4a9c788ce236b"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-f497fed3ed404229f788caa8b44a4cd545d786666e6ef57c1bc70479cc09666c2452449e9b39962dd9c098231e8a0c226ae2e8b4c572e019c0f4a9c788ce236b"' : 'data-bs-target="#xs-injectables-links-module-AppModule-f497fed3ed404229f788caa8b44a4cd545d786666e6ef57c1bc70479cc09666c2452449e9b39962dd9c098231e8a0c226ae2e8b4c572e019c0f4a9c788ce236b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-f497fed3ed404229f788caa8b44a4cd545d786666e6ef57c1bc70479cc09666c2452449e9b39962dd9c098231e8a0c226ae2e8b4c572e019c0f4a9c788ce236b"' :
                                        'id="xs-injectables-links-module-AppModule-f497fed3ed404229f788caa8b44a4cd545d786666e6ef57c1bc70479cc09666c2452449e9b39962dd9c098231e8a0c226ae2e8b4c572e019c0f4a9c788ce236b"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' :
                                            'id="xs-controllers-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' :
                                        'id="xs-injectables-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-584b98beb8a9d9d4ee294be312913b8b1987f2cf9fc40f8e82e3a6caafaed0da09b4cf3be628d4c4af7d818a08d5a85cc47a13a90502c6768172ec467f772d37"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-584b98beb8a9d9d4ee294be312913b8b1987f2cf9fc40f8e82e3a6caafaed0da09b4cf3be628d4c4af7d818a08d5a85cc47a13a90502c6768172ec467f772d37"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-584b98beb8a9d9d4ee294be312913b8b1987f2cf9fc40f8e82e3a6caafaed0da09b4cf3be628d4c4af7d818a08d5a85cc47a13a90502c6768172ec467f772d37"' :
                                            'id="xs-controllers-links-module-PostsModule-584b98beb8a9d9d4ee294be312913b8b1987f2cf9fc40f8e82e3a6caafaed0da09b4cf3be628d4c4af7d818a08d5a85cc47a13a90502c6768172ec467f772d37"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-584b98beb8a9d9d4ee294be312913b8b1987f2cf9fc40f8e82e3a6caafaed0da09b4cf3be628d4c4af7d818a08d5a85cc47a13a90502c6768172ec467f772d37"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-584b98beb8a9d9d4ee294be312913b8b1987f2cf9fc40f8e82e3a6caafaed0da09b4cf3be628d4c4af7d818a08d5a85cc47a13a90502c6768172ec467f772d37"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-584b98beb8a9d9d4ee294be312913b8b1987f2cf9fc40f8e82e3a6caafaed0da09b4cf3be628d4c4af7d818a08d5a85cc47a13a90502c6768172ec467f772d37"' :
                                        'id="xs-injectables-links-module-PostsModule-584b98beb8a9d9d4ee294be312913b8b1987f2cf9fc40f8e82e3a6caafaed0da09b4cf3be628d4c4af7d818a08d5a85cc47a13a90502c6768172ec467f772d37"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-b0051727d828663a6cd67cd109331608f5f4f777b6133425733db16c567136e789bfea81939b55ed3fcb1a7159389c2a95f54dc95134b6c0fb1c3d804b9b65b6"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-b0051727d828663a6cd67cd109331608f5f4f777b6133425733db16c567136e789bfea81939b55ed3fcb1a7159389c2a95f54dc95134b6c0fb1c3d804b9b65b6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-b0051727d828663a6cd67cd109331608f5f4f777b6133425733db16c567136e789bfea81939b55ed3fcb1a7159389c2a95f54dc95134b6c0fb1c3d804b9b65b6"' :
                                            'id="xs-controllers-links-module-UsersModule-b0051727d828663a6cd67cd109331608f5f4f777b6133425733db16c567136e789bfea81939b55ed3fcb1a7159389c2a95f54dc95134b6c0fb1c3d804b9b65b6"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-b0051727d828663a6cd67cd109331608f5f4f777b6133425733db16c567136e789bfea81939b55ed3fcb1a7159389c2a95f54dc95134b6c0fb1c3d804b9b65b6"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-b0051727d828663a6cd67cd109331608f5f4f777b6133425733db16c567136e789bfea81939b55ed3fcb1a7159389c2a95f54dc95134b6c0fb1c3d804b9b65b6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-b0051727d828663a6cd67cd109331608f5f4f777b6133425733db16c567136e789bfea81939b55ed3fcb1a7159389c2a95f54dc95134b6c0fb1c3d804b9b65b6"' :
                                        'id="xs-injectables-links-module-UsersModule-b0051727d828663a6cd67cd109331608f5f4f777b6133425733db16c567136e789bfea81939b55ed3fcb1a7159389c2a95f54dc95134b6c0fb1c3d804b9b65b6"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptions.html" data-type="entity-link" >CreatePostMetaOptions</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamDto.html" data-type="entity-link" >GetUserParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});