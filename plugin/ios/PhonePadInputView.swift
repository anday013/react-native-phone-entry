import UIKit

/// A custom phone-pad input view designed for iPad.
/// Replaces the system keyboard with a 12-key dial-pad that mirrors the
/// iPhone phone-pad layout, ensuring a consistent experience across devices.
@objc public class PhonePadInputView: UIInputView {

  // MARK: - Types

  private struct Key {
    let primary: String
    let secondary: String?
    let action: Action

    enum Action {
      case insert(String)
      case delete
      case openCountryPicker
      case none
    }

    init(_ primary: String, _ secondary: String? = nil, action: Action? = nil) {
      self.primary = primary
      self.secondary = secondary
      self.action = action ?? .insert(primary)
    }
  }

  // MARK: - Layout

  private let rows: [[Key]] = [
    [Key("1"), Key("2", "ABC"), Key("3", "DEF")],
    [Key("4", "GHI"), Key("5", "JKL"), Key("6", "MNO")],
    [Key("7", "PQRS"), Key("8", "TUV"), Key("9", "WXYZ")],
    [Key("🌐", action: .openCountryPicker), Key("0", "+"), Key("⌫", action: .delete)],
  ]

  // MARK: - Properties

  private weak var targetField: UITextField?
  @objc var onCountryPickerRequest: (() -> Void)?

  // MARK: - Colours (adaptive for dark/light mode)

  private var keyboardBackground: UIColor {
    UIColor { traits in
      traits.userInterfaceStyle == .dark
        ? UIColor(red: 0.17, green: 0.17, blue: 0.18, alpha: 1)
        : UIColor(red: 0.82, green: 0.84, blue: 0.87, alpha: 1)
    }
  }

  private var keyBackground: UIColor {
    UIColor { traits in
      traits.userInterfaceStyle == .dark
        ? UIColor(red: 0.36, green: 0.36, blue: 0.38, alpha: 1)
        : UIColor.white
    }
  }

  private var emptyKeyBackground: UIColor {
    UIColor { traits in
      traits.userInterfaceStyle == .dark
        ? UIColor(red: 0.22, green: 0.22, blue: 0.23, alpha: 1)
        : UIColor(red: 0.69, green: 0.71, blue: 0.74, alpha: 1)
    }
  }

  private var primaryTextColor: UIColor { .label }
  private var secondaryTextColor: UIColor { .secondaryLabel }

  // MARK: - Init

  @objc public init(textField: UITextField) {
    self.targetField = textField
    let screenWidth = UIScreen.main.bounds.width
    super.init(frame: CGRect(x: 0, y: 0, width: screenWidth, height: 280),
               inputViewStyle: .keyboard)
    translatesAutoresizingMaskIntoConstraints = false
    setupUI()
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // MARK: - UI Setup

  private func setupUI() {
    backgroundColor = keyboardBackground

    let outerStack = UIStackView()
    outerStack.axis = .vertical
    outerStack.distribution = .fillEqually
    outerStack.spacing = 10
    outerStack.translatesAutoresizingMaskIntoConstraints = false
    addSubview(outerStack)

    NSLayoutConstraint.activate([
      outerStack.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 5),
      outerStack.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -5),
      outerStack.topAnchor.constraint(equalTo: topAnchor, constant: 10),
      outerStack.bottomAnchor.constraint(equalTo: safeAreaLayoutGuide.bottomAnchor, constant: -6),
    ])

    for (rowIndex, row) in rows.enumerated() {
      let rowStack = UIStackView()
      rowStack.axis = .horizontal
      rowStack.distribution = .fillEqually
      rowStack.spacing = 10
      outerStack.addArrangedSubview(rowStack)

      for key in row {
        rowStack.addArrangedSubview(makeKeyView(key: key, rowIndex: rowIndex))
      }
    }
  }

  private func makeKeyView(key: Key, rowIndex: Int) -> UIView {
    // Empty / spacer slot
    if case .none = key.action {
      let spacer = UIView()
      spacer.backgroundColor = emptyKeyBackground
      spacer.layer.cornerRadius = 5
      spacer.layer.shadowColor = UIColor.black.cgColor
      spacer.layer.shadowOpacity = 0.3
      spacer.layer.shadowOffset = CGSize(width: 0, height: 1)
      spacer.layer.shadowRadius = 0
      return spacer
    }

    let button = UIButton(type: .custom)
    button.backgroundColor = keyBackground
    button.layer.cornerRadius = 5
    button.layer.shadowColor = UIColor.black.cgColor
    button.layer.shadowOpacity = 0.3
    button.layer.shadowOffset = CGSize(width: 0, height: 1)
    button.layer.shadowRadius = 0

    // Store action
    button.accessibilityLabel = key.primary
    switch key.action {
    case .delete:
      button.addTarget(self, action: #selector(deletePressed(_:)), for: .touchUpInside)
      addHighlightBehavior(to: button)
      let img = UIImage(systemName: "delete.left")
      button.setImage(img, for: .normal)
      button.tintColor = primaryTextColor
    case .openCountryPicker:
      button.addTarget(self, action: #selector(countryPickerPressed), for: .touchUpInside)
      addHighlightBehavior(to: button)
      let img = UIImage(systemName: "globe")
      button.setImage(img, for: .normal)
      button.tintColor = primaryTextColor
    case .insert(let char):
      button.tag = Int(char.unicodeScalars.first?.value ?? 0)
      button.addTarget(self, action: #selector(keyPressed(_:)), for: .touchUpInside)
      addHighlightBehavior(to: button)
      addKeyLabels(to: button, primary: key.primary, secondary: key.secondary)
    case .none:
      break
    }

    return button
  }

  private func addKeyLabels(to button: UIButton, primary: String, secondary: String?) {
    let primaryLabel = UILabel()
    primaryLabel.text = primary
    primaryLabel.font = UIFont.systemFont(ofSize: 26, weight: .light)
    primaryLabel.textColor = primaryTextColor
    primaryLabel.textAlignment = .center
    primaryLabel.translatesAutoresizingMaskIntoConstraints = false
    button.addSubview(primaryLabel)

    if let sec = secondary {
      let secLabel = UILabel()
      secLabel.text = sec
      secLabel.font = UIFont.systemFont(ofSize: 10, weight: .medium)
      secLabel.textColor = secondaryTextColor
      secLabel.textAlignment = .center
      secLabel.translatesAutoresizingMaskIntoConstraints = false
      button.addSubview(secLabel)

      NSLayoutConstraint.activate([
        primaryLabel.centerXAnchor.constraint(equalTo: button.centerXAnchor),
        primaryLabel.centerYAnchor.constraint(equalTo: button.centerYAnchor, constant: -7),
        secLabel.centerXAnchor.constraint(equalTo: button.centerXAnchor),
        secLabel.topAnchor.constraint(equalTo: primaryLabel.bottomAnchor, constant: 1),
      ])
    } else {
      NSLayoutConstraint.activate([
        primaryLabel.centerXAnchor.constraint(equalTo: button.centerXAnchor),
        primaryLabel.centerYAnchor.constraint(equalTo: button.centerYAnchor),
      ])
    }
  }

  // MARK: - Button Highlight

  private func addHighlightBehavior(to button: UIButton) {
    button.addTarget(self, action: #selector(buttonHighlighted(_:)), for: .touchDown)
    button.addTarget(self, action: #selector(buttonHighlighted(_:)), for: .touchDragEnter)
    button.addTarget(self, action: #selector(buttonUnhighlighted(_:)), for: .touchUpInside)
    button.addTarget(self, action: #selector(buttonUnhighlighted(_:)), for: .touchDragExit)
    button.addTarget(self, action: #selector(buttonUnhighlighted(_:)), for: .touchCancel)
  }

  @objc private func buttonHighlighted(_ sender: UIButton) {
    sender.alpha = 0.5
  }

  @objc private func buttonUnhighlighted(_ sender: UIButton) {
    UIView.animate(withDuration: 0.1) { sender.alpha = 1.0 }
  }

  // MARK: - Actions

  @objc private func keyPressed(_ sender: UIButton) {
    guard let scalar = Unicode.Scalar(sender.tag),
          let field = targetField else { return }
    let char = String(scalar)
    // Use insertText so the cursor position and delegate callbacks work correctly
    field.insertText(char)
    provideFeedback()
  }

  @objc private func countryPickerPressed() {
    provideFeedback()
    onCountryPickerRequest?()
  }

  @objc private func deletePressed(_ sender: UIButton) {
    targetField?.deleteBackward()
    provideFeedback()
  }

  private func provideFeedback() {
    let generator = UIImpactFeedbackGenerator(style: .light)
    generator.impactOccurred()
  }
}
