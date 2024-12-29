import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(req) {
  try {
    const { search, field = 'id' } = Object.fromEntries(new URL(req.url).searchParams);

    if (!search) {
      return NextResponse.json({ error: "Searched keyword is required" }, { status: 400 });
    }
    if (!field) {
      return NextResponse.json({ error: "Field is required" }, { status: 400 });
    }

    const { data: exactMatch, error: emError } = await supabase
      .from("users")
      .select("*")
      .eq(field, search);

      if (emError) {
        return NextResponse.json({ error }, { status: 400 });
      }

    const { data: otherMatches, error: omError } = await supabase
      .from("users")
      .select("*")
      .ilike(field, `%${search}%`);

      if (omError) {
        return NextResponse.json({ error }, { status: 400 });
      }

    let allMatches = [];

    if (exactMatch && exactMatch.length > 0) {
      allMatches = [
        exactMatch[0],
        ...otherMatches.filter((item) => item.id !== exactMatch[0].id),
      ];
    } else {
      allMatches = otherMatches;
    }

    return NextResponse.json(allMatches);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function POST(req) {
  try {
    const { id, username, name, email, location, tags, interactions, bio } = await req.json();
    const { data, error } = await supabase
      .from('users')
      .insert([{ id, username, name, email, location, tags, interactions, bio }])
      .select();

      if (error) {
        return NextResponse.json({ error }, { status: 400 });
      }

    return NextResponse.json(data ? data[0] : { message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 406 });
  }
}

export async function PUT(req, params) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const { name, email, location, tags, interactions, bio } = await req.json();
    const { data, error } = await supabase
      .from('users')
      .update([{ name, email, location, tags, interactions, bio }])
      .eq('id', id)
      .select();

      if (error) {
        return NextResponse.json({ error }, { status: 400 });
      }

    return NextResponse.json(data ? data[0] : { message: 'User updated successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function DELETE(req, params) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from('users')
      .select()
      .eq('id', id)
      .delete();

      if (error) {
        return NextResponse.json({ error }, { status: 400 });
      }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}