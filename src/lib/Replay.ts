type NetworkFrameActor = {
    actor_id: number,
    stream_id?: number,
    name_id?: number,
    object_id: number,
    attribute: any,
}

type NetworkFrame = {
    time: number,
    delta: number,
    new_actors: NetworkFrameActor[],
    deleted_actors: NetworkFrameActor[],
    updated_actors: NetworkFrameActor[]
}



export class Replay {
    actors: Map<number, Map<number, Map<string, any>>> = new Map();
    actorNameId: Map<number, number> = new Map();
    networkFrames: NetworkFrame[] = []
    objectNames: string[] = []
    actorNames: string[] = []

    currentFrame = -1;

    constructor(objectNames: string[], actorNames: string[], networkFrames: any[]) {
        this.objectNames = objectNames;
        this.actorNames = actorNames;
        this.networkFrames = networkFrames;
    }

    clearActors () {
        this.actors = new Map();
    }

    setAttribute (actorId: number, objectId: number, name: string, value: any) {
        if(!this.actors.has(actorId)) {
            this.actors.set(actorId, new Map());
        }
        if(!this.actors.get(actorId)?.has(objectId)) {
            this.actors.get(actorId)?.set(objectId, new Map());
        }

        this.actors.get(actorId)?.get(objectId)?.set(name, value);
    }

    getActor (actorId: number) {
        return this.actors.get(actorId);
    }

    getObjectName (objectId: number) {
        return this.objectNames[objectId];
    }

    getObjectIdFromName (objectName: string){
        return this.objectNames.indexOf(objectName);
    }

    findActorsByObjectId (objectId: number) {
        return new Map([...this.actors].filter(([actor_id, object_map]) => {
            return object_map.has(objectId);
        }));
    }

    executeFrame (frameIndex: number) {
        const frame = this.networkFrames[frameIndex];

        // new actors
        for (const actor of frame.new_actors){
            this.actors.set(actor.actor_id, new Map());

            if(actor.object_id){
                this.actors.get(actor.actor_id)?.set(actor.object_id, new Map());
            }

            if(actor.name_id){
                this.actorNameId.set(actor.actor_id, actor.name_id)
            }

        }

        // deleted actors
        for (const actor of frame.deleted_actors){
            this.actors.delete(actor.actor_id);
            this.actorNameId.delete(actor.actor_id);
        }

        // updated actors
        for (const actor of frame.updated_actors){
            if(actor.attribute){
                this.setAttribute(actor.actor_id, actor.object_id, Object.keys(actor.attribute)[0], Object.values(actor.attribute)[0]);
            }
        }

    }

    //clear state and execute first n frames
    executeFrames(count: number) {
        this.clearActors()
        for (let n=0; n < count; n++) {
            this.executeFrame(n)
        }
    }
}

export const printReplayData = (replay: Replay) => {
    for(const [actor_id, object_map] of replay.actors) {
        const actorNameId = replay.actorNameId.get(actor_id)
        console.log(`\n\n-- Actor ${actor_id} ( ${actorNameId ? replay.actorNames[actorNameId] : actorNameId} ) --`);

        for(const [object_id, attributes] of object_map){
            console.log(`\n - Object ${replay.getObjectName(object_id)} (${object_id}) -`);
            for(const [name, value] of attributes){
                console.log(`${name}:\n${JSON.stringify(value, null, 2)}`);
            }
        }
    }
}

export const createReplayFromJSON = (replayJSON: any) => {
    const network_frames = replayJSON.network_frames.frames;
    return new Replay(replayJSON.objects, replayJSON.names, network_frames);
}
