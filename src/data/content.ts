// Everything the client sees lives here. Edit text, add a page or swap an image without touching the layout.
// Images and logos are served from /public (e.g. public/img/home.webp -> "/img/home.webp").

export const site = {
  client: "Hylates Ltd",
  title: "Οδηγός ιστοσελίδας",
  intro: "Τα στοιχεία της εταιρικής σας ταυτότητας και κάθε σελίδα της νέας ιστοσελίδας, μαζί με το τι κάνει η καθεμία.",
};

export const brandNav = {
  title: "Ταυτότητα",
  logo: "Λογότυπο",
  colour: "Χρώματα",
  type: "Γραμματοσειρές",
};

export const logo = {
  text: "Χρησιμοποιήστε το πλήρες λογότυπο όπου υπάρχει χώρος. Το σύμβολο μόνο του είναι για το favicon, τις εικόνες προφίλ στα social media και όπου το σλόγκαν θα ήταν πολύ μικρό για να διαβαστεί.",
  lockups: [
    { src: "/assets/logo-on-black.svg", alt: "Λογότυπο Hylates Ltd σε μαύρο φόντο", bg: "black" },
    { src: "/assets/logo-on-white.svg", alt: "Λογότυπο Hylates Ltd σε λευκό φόντο", bg: "white" },
  ],
  marks: [
    { src: "/assets/mark-red.svg", alt: "Σύμβολο, κόκκινο σε μαύρο", bg: "black" },
    { src: "/assets/mark-red.svg", alt: "Σύμβολο, κόκκινο σε λευκό", bg: "white" },
    { src: "/assets/mark-white.svg", alt: "Σύμβολο, λευκό σε κόκκινο", bg: "red" },
  ],
} as const;

export const colour = {
  text: "Το κόκκινο, το μαύρο και το λευκό είναι τα βασικά χρώματα της εταιρείας. Οι μεταλλικοί τόνοι είναι μόνο για μικρές λεπτομέρειες. Πατήστε ένα χρώμα για να αντιγράψετε τον κωδικό του.",
  swatches: [
    { name: "Κόκκινο Hylates", hex: "#E7080B" },
    { name: "Μαύρο Μηχανής", hex: "#0E0E0E" },
    { name: "Λευκό", hex: "#FFFFFF" },
    { name: "Γραφίτης", hex: "#3A3A3A" },
    { name: "Πυρακτωμένο Πορτοκαλί", hex: "#E84F07" },
    { name: "Χαλκός", hex: "#DE985A" },
    { name: "Ορείχαλκος", hex: "#C09F80" },
    { name: "Ατσάλι", hex: "#D6D6D6" },
  ],
};

export const typography = {
  text: "Δύο δωρεάν γραμματοσειρές της Google. Η Inter Tight για τίτλους, τιμές και ονόματα προϊόντων. Η Inter για όλα τα κείμενα που διαβάζονται με προσοχή.",
  faces: [
    { name: "Inter Tight", use: "ExtraBold · Τίτλοι", className: "t1" },
    { name: "Inter", use: "Regular · Κείμενο", className: "t2" },
  ],
};

export const ui = {
  sections: "Ενότητες",
  device: "Συσκευή",
  desktop: "Υπολογιστής",
  mobile: "Κινητό",
  fullScreen: "Πλήρης οθόνη",
  close: "Κλείσιμο",
  copySvg: "Αντιγραφή SVG",
};

export type SitePage = {
  id: string;
  name: string;
  group: (typeof pageGroups)[number];
  purpose: string;
  img: string;
  mobile?: string;
  phone?: boolean;
  tag?: string;
  /** Other states of the same page, picked from the bar above the preview (the first one is `img`). */
  variants?: { label: string; img: string; icon: "cart" | "cart-empty" }[];
};

export const pageGroups = ["Κατάστημα", "Παραγγελίες"] as const;

export const pages: SitePage[] = [
  {
    id: "home",
    group: "Κατάστημα",
    name: "Αρχική",
    img: "/img/home.webp",
    mobile: "/img/home-mobile.webp",
    purpose: "Η βιτρίνα του καταστήματος. Δείχνει τι πουλάει η Hylates, ότι κάνετε παράδοση σε όλη την Κύπρο με αντικαταβολή, και φέρνει τον επισκέπτη σε μια κατηγορία ή στην προσφορά του μήνα με ένα κλικ.",
  },
  {
    id: "category",
    group: "Κατάστημα",
    name: "Κατηγορία",
    img: "/img/category.webp",
    mobile: "/img/category-mobile.webp",
    purpose: "Βοηθά τον πελάτη να βρει το σωστό μηχάνημα μέσα σε ένα τμήμα, με φίλτρα για μάρκα, μέθοδο συγκόλλησης, ένταση ρεύματος και τροφοδοσία. Όλες οι κατηγορίες έχουν αυτή τη διάταξη.",
  },
  {
    id: "product",
    group: "Κατάστημα",
    name: "Προϊόν",
    img: "/img/product.webp",
    purpose: "Όλα όσα χρειάζεται κάποιος για να αγοράσει ένα μηχάνημα με σιγουριά: φωτογραφίες, επιλογές πακέτου, βασικά χαρακτηριστικά και τι περιέχει η συσκευασία. Ο πελάτης μπορεί να το βάλει στο καλάθι, να τηλεφωνήσει ή να παραγγείλει από Viber ή WhatsApp.",
  },
  {
    id: "about",
    group: "Κατάστημα",
    name: "Σχετικά με εμάς",
    img: "/img/about.webp",
    purpose: "Δείχνει ότι η Hylates είναι πραγματικό κατάστημα στη Λεμεσό: την ομάδα, τις μάρκες που φέρνετε, τον χώρο του καταστήματος και πώς μπορεί κανείς να σας επισκεφθεί.",
  },
  {
    id: "cart",
    group: "Παραγγελίες",
    name: "Καλάθι",
    img: "/img/cart-panel.webp",
    variants: [
      { label: "Με προϊόντα", img: "/img/cart-panel.webp", icon: "cart" },
      { label: "Άδειο", img: "/img/cart-empty.webp", icon: "cart-empty" },
    ],
    purpose: "Ανοίγει από το πλάι όταν κάποιος προσθέτει ένα προϊόν, ώστε να μένει στη σελίδα που έβλεπε. Προτείνει τι ταιριάζει με το μηχάνημα, δείχνει το σύνολο και την έκπτωση, και οδηγεί στο ταμείο ή σε παραγγελία από Viber/WhatsApp. Όταν είναι άδειο, δείχνει τις προσφορές του μήνα, τα πιο δημοφιλή προϊόντα και έναν τρόπο να ζητήσει κανείς συμβουλή.",
  },
  {
    id: "checkout",
    group: "Παραγγελίες",
    name: "Ταμείο",
    img: "/img/checkout.webp",
    purpose: "Μία σελίδα: στοιχεία επικοινωνίας και διεύθυνση αριστερά, η παραγγελία με αναλυτικές τιμές δεξιά. Τα προϊόντα αλλάζουν ακόμα και εδώ, και όποιος προτιμά μπορεί να στείλει την παραγγελία με μήνυμα.",
  },
  {
    id: "confirmed",
    group: "Παραγγελίες",
    name: "Επιβεβαίωση παραγγελίας",
    img: "/img/confirmed.webp",
    purpose: "Δείχνει τον αριθμό της παραγγελίας και εξηγεί τι ακολουθεί, ξεκινώντας με ένα τηλεφώνημα από την ομάδα σας για επιβεβαίωση.",
  },
  {
    id: "message-sent",
    group: "Παραγγελίες",
    name: "Παραγγελία με μήνυμα",
    img: "/img/message-sent.webp",
    purpose: "Εμφανίζεται αφού κάποιος στείλει το καλάθι του σε Viber ή WhatsApp. Του λέει ότι η παραγγελία βρίσκεται στη συνομιλία και πότε θα απαντήσει η ομάδα σας.",
  },
];
