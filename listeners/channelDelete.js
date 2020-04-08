const { Listener } = require('discord-akairo');

module.exports = class ChannelDeleteListener extends Listener {
    constructor() {
        super('channelDelete', {
            emitter: 'client',
            event: 'channelDelete'
        });
    }

    async exec(channel) {

        // Fetch entry relating to action
        let entry = await channel.guild.find_entry('CHANNEL_DELETE', (e) => e.target.id === channel.id);
        if (!entry) return;

        // Fetch entries (w/ entry prepended)
        let entries = channel.guild.push_entry(entry, `#${channel.name}`);

        // Check limits
        channel.guild.check_limits(entries, entry.executor.id, 'channel_deletions');
        
    }
}