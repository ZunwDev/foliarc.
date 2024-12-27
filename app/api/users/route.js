import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('users')
      .eq('id', id)
      .select();

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
    const { id, username, name, email, location, tags, interactions, bio } = await req.json();
    const { data, error } = await supabase
      .from('users')
      .insert([{ id, username, name, email, location, tags, interactions, bio }])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data ? data[0] : { message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, name, email, location, tags, interactions, bio } = await req.json();
    const { data, error } = await supabase
      .from('users')
      .update([{ name, email, location, tags, interactions, bio }])
      .eq('id', id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data ? data[0] : { message: 'User updated successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}