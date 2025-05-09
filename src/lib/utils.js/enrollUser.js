import { supabase } from '../lib/supabaseClient';

export async function enrollUser(userId, classId) {
  const { data, error } = await supabase.from('enrollments').insert([
    {
      user_id: userId,
      class_id: classId,
    },
  ]);

  if (error) {
    console.error('Error enrolling user:', error);
    throw error;
  }

  return data;
}
