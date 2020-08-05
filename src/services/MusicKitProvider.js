
export default class MusicKitProvider {
    static instance

    static getMusicKitInstance() {
        if (!MusicKitProvider.instance) {
            window.MusicKit.configure({
                developerToken: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjQ2UEs4NDJWUU4ifQ.eyJpc3MiOiI2NzU0SERZM1Q0IiwiaWF0IjoxNTk2NTg0NTk1LCJleHAiOjE2MTIxMzY1OTV9.6qJ6ZpBuc2LTXK22gCdXbp8YytrtQo0JvgbrCZJLmKeIEtJGPGhH07d6cNI8JF1gCrKchp71fm5N_ZV8EUfKLg',
                app: {
                   name: 'Playlist Tools',
                   build: '2020.08.04',
                }
            });

            MusicKitProvider.instance = window.MusicKit.getInstance();
        }
        return MusicKitProvider.instance
    }

    static getPackage() {
       return window.MusicKit
    }
}