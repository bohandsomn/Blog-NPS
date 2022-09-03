type Topics = {
    button: 'linear' | 'plain' | 'ellipsis'
    div: 'app' | 'user-profile' | 'main-header' | 'user-information' | 'user-information-container' | 'additional-information' | 'additional-information-container' | 'user-full-name' | 'posts-subscribers-buttons' | 'post-creator-fields' | 'post-creator-visibility' | 'post-creator-button' | 'posts-post-title-settings' | 'posts-post-follow' | 'registration-form-greeting' | 'registration-form' | 'login-form' | 'registration-form-wrapper' | 'login-form-wrapper' | 'post-container' | 'label-with-icon-content' | 'account-photo-constructor' | 'account-photo-constructor-wrapper' | 'registration-form-privacy' | 'post-updater-fields' | 'post-updater-button' | 'comment-container' | 'comment-section' | 'create-comment' | 'search-panel-fields' | 'not-found-container' | 'toggle' | 'toggle-wrapper' | 'chats' | 'list-of-users' | 'chat' | 'chat-window' | 'message' | 'chat-settings' | 'change-photo' | 'search-user'
    form: 'admin' | 'post-updater-container' | 'search-post-container' | 'create-chat' | 'update-chat' | 'send-message-field' | 'post-creator-container'
    h1: '404' | 'heading24' | 'post-creator-header'
    h3: string
    header: 'main' | 'comment' | 'chats'
    img: 'user-profile-preview' | 'account-original' | 'additional-information-preview' | 'post-post' | 'comment-message' | 'user-item-preview' | 'chat-item-preview' | 'chat-item-message' | 'change-photo'
    input: 'main' | 'heading24' | 'plain'
    label: 'indented' | 'account-personal-information'
    li: 'account-my-post' | 'home-post' | 'message' | 'right-message'
    nav: string
    p: 'wrap-anywhere' | 'posts-post-time' | 'account-photo-constructor' | 'account-personal-information' | 'post-updater-button' | 'comment-content-inscription' | 'not-found-description' | 'ellipsis' | 'message'
    path: string
    section: 'container'
    span: string
    svg: string
    textarea: 'main'
    ul: 'header-pull-down-menu' | 'else-information' | 'additional-information-users' | 'posts-container' | 'account-my-posts-my-post-settings-modal-window' | 'post-comments' | 'input-with-list' | 'styles-list' | 'folio' | 'chat-list' | 'messages' | 'main'
}

export type TagName = keyof Topics
export type StylesData<T extends TagName = TagName> = Record<
    T, 
    Record<
        Topics[T], 
        Record<string, string | Record<string, string>>
    >
>
export type Variable = 'general' | 'light' | 'dark'
export type Theme<V extends Variable> = Record<V, Record<string, Record<string, string>>>
