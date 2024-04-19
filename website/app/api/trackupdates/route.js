import dbConnect from "@/lib/dbConnect";
import Location from "@/models/Location";
import { NextResponse } from "next/server";

export async function GET(request) {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const shipment = searchParams.get("shipment");
    // shipment is "1" for /api/trackupdates?shipment=1

    try {
        const location = await Location.find({ shipment: shipment });
        return NextResponse.json(location, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    await dbConnect();

    // request body is raw json
    const req = await request.json();
    const { shipment, location, lat, lng } = req;
    console.log({ req });

    try {
        const newLocation = new Location({
            shipment,
            location,
            lat,
            lng,
        });

        await newLocation.save();
        return NextResponse.json(newLocation, { status: 201 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
