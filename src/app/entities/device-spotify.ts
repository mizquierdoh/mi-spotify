export class DeviceSpotify {

    id: string;
    name: string;
    type: string;
    volume: number;
    isActive: boolean;

    static parse(d: any): DeviceSpotify {
        let device = new DeviceSpotify();
        device.id = d['id'];
        device.name = d['name'];
        device.type = d['type'];
        device.volume = d['volume'];
        device.isActive = d['is_active'];
        return device;
    }
}
