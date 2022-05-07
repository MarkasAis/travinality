require 'rails_helper'

RSpec.describe "guides#update", type: :request do
  subject(:make_request) do
    jsonapi_put "/api/v1/guides/#{guide.id}", payload
  end

  describe 'basic update' do
    let!(:guide) { create(:guide) }

    let(:payload) do
      {
        data: {
          id: guide.id.to_s,
          type: 'guides',
          attributes: {
            # ... your attrs here
          }
        }
      }
    end

    # Replace 'xit' with 'it' after adding attributes
    xit 'updates the resource' do
      expect(GuideResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { guide.reload.attributes }
    end
  end
end
