import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-client";

export async function GET(req, context) {
    try {
      const { pid } = await context.params;
  
      const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('pid', pid)
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { pid, uid, name, likeCount, tags, replies, image } =
      await req.json();
    const { data, error } = await supabase
      .from("portfolios")
      .insert([{ pid, uid, name, likeCount, tags, replies, image }])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      data ? data[0] : { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { pid, name, likeCount, tags, replies, image } = await req.json();
    const { data, error } = await supabase
      .from("portfolios")
      .update([{ name, likeCount, tags, replies, image }])
      .eq("pid", pid)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      data ? data[0] : { message: "User updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { pid } = await req.json();
    const { error } = await supabase
      .from("portfolios")
      .delete()
      .eq("pid", pid);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
