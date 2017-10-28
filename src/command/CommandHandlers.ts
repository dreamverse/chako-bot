import { IFunctionMap } from './IFunctionMap';

export const CommandHandlers: IFunctionMap = {
    'roleManagement.add': (chatInstance, result): Promise<string> => {
        const params = result.parameters;
        const roleName = params.role;
        const guildMember = chatInstance.member;
        const role = chatInstance.guild.roles.find('name', roleName);

        return new Promise((resolve, reject) => {
            if (role) {
                resolve(guildMember.addRole(role).then(() => {
                    return result.fulfillment.speech;
                }).catch((error: any) => {
                    console.log(error);
                    return `I can't, because: ${error.message}`;
                }));
            } else {
                reject('I can\'t');
            }
        });
    },
    'roleManagement.remove': (chatInstance, result): Promise<string> => {
        const params = result.parameters;
        const roleName = params.role;
        const guildMember = chatInstance.member;
        const role = chatInstance.guild.roles.find('name', roleName);

        return new Promise((resolve, reject) => {
            if (role) {
                resolve(guildMember.removeRole(role).then(() => {
                    return result.fulfillment.speech;
                }).catch((error: any) => {
                    console.log(error);
                    return `I can't, because: ${error.message}`;
                }));
            } else {
                reject('I can\'t');
            }
        });
    }
}