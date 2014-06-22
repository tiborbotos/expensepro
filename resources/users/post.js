if (this.nid && this.nid !== '') { // oath check
    dpd.users.get({nid: this.nid}, function (user) {
        if (user !== undefined && user._id !== undefined) {
            cancel('User already registered with that nid! '+ user._id, 401);
        }
    });
}

this.createdAt = (new Date()).getTime();

