const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(/\s+/).filter((tag) => tag !== '');

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  const seenHashtags = new Set();

  for (const hashtag of hashtags) {
    if (!HASHTAG_REGEX.test(hashtag)) {
      return false;
    }

    const lowerHashtag = hashtag.toLowerCase();
    if (seenHashtags.has(lowerHashtag)) {
      return false;
    }

    seenHashtags.add(lowerHashtag);
  }

  return true;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

export { validateHashtags, validateComment, MAX_COMMENT_LENGTH };
