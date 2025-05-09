import { enrollUser } from '../utils/enrollUser';
import { supabase } from '../lib/supabaseClient';

export default function ClassCard({ classId, className }) {
  const handleSignIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Please log in first.');
      return;
    }

    try {
      await enrollUser(user.id, classId);
      alert(`You signed in to ${className}`);
    } catch (err) {
      alert('Sign-in failed.');
    }
  };

  return (
    <div className="class-card">
      <h3>{className}</h3>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}
